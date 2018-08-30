const db = require('../db.js');
const sha256 = require('js-sha256');


const postNewUser = (req, res) => {
    let { name, email, password, cmfpassword } = req.body;

    if (password == cmfpassword) {

        let findExistingUser = "SELECT * FROM users WHERE email = $1";
        let value = [email]

        db.query(findExistingUser, value, (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.rows.length < 1 ) {
                let insertNewUser = "INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *";
                let values = [name, email, sha256(password)];

                db.query(insertNewUser, values, (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    res.cookie('user_id', result.rows[0].id);
                    res.json({result: result.rows[0], message: 'successfully created user', loginStatus: true});
                })
            } else {
                res.json({message: 'email already exists', loginStatus: false})
            }
        })
    } else {
        res.json({message: 'password does not match', loginStatus: false})
    }
}

const postUserLogin = (req, res) => {
    let { email, password } = req.body;
    let findUser = "SELECT * FROM users WHERE email = $1 and password = $2";
    let values = [email, sha256(password)];

    db.query(findUser, values, (err, result) => {

        if (result.rows.length > 0) {
            res.cookie('user_id', result.rows[0].id);
            res.json({result: result.rows[0], message: 'successfully logged in', loginStatus: true});
        } else {
            res.json({message: 'either email or password wrong', loginStatus: false});
        }
    })
}

module.exports = {
    postNewUser,
    postUserLogin
};