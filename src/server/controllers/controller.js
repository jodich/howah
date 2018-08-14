const db = require('../db.js');
const sha256 = require('js-sha256');


const selectCategories = (req, res) => {

    let selectCategories = "SELECT * FROM categories"
    db.query(selectCategories, (err, result) => {
        res.json(result.rows)
    });
}

const selectPosts = (req, res) => {

    let selectPosts = "SELECT * FROM posts WHERE current_timestamp < deadline"
    db.query(selectPosts, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.json( {result: result.rows} )
    });
}

const selectSpecificPost = (req, res) => {
    let postId = req.params.id;
    
    let selectSpecificPost = "SELECT *, AGE(deadline, current_timestamp::timestamp(0)) FROM posts WHERE id = $1";
    let value = [postId];
    db.query(selectSpecificPost, value, (err, result) => {
        let resultPost = result.rows[0];
        let selectPostOptions = "SELECT * FROM options WHERE post_id = $1"
        db.query(selectPostOptions, value, (err, result) => {
            let resultOptions = result.rows
            res.json( {post: resultPost, options: resultOptions} )
        })
    })
}

const postNewPost = (req, res) => {
    let { title, question, time, date, userId, hasPerformedAjax, postId, ...options } = req.body;

    // FORMATTING DEADLINE'S DATETIME
    let dateArr = date.split('/');
    let formatedDate = dateArr.reverse().join('-')
    let deadline = `${formatedDate} ${time}:00`
    // // //

    let insertNewPost = 'INSERT INTO posts (title, question, author_id, deadline) VALUES ($1, $2, $3, $4) RETURNING *';
    let values = [title, question, userId, deadline];

    db.query(insertNewPost, values, (err, result) => {
        if (err) {
            console.log(err)
        }

        // FORMATTING INSERT OPTION QUERY
        let insertOptions = 'INSERT INTO options (post_id, option) VALUES '
        let resPostId = result.rows[0].id;
        let dataArr = []
        for (key in options) {
            let data = `(${resPostId}, \'${options[key]}\')`
            dataArr.push(data);
        }
        let values = dataArr.join(', ');
        insertOptions = insertOptions + values;
        insertOptions = insertOptions + ' RETURNING *'
        // // //

        db.query(insertOptions, (err, result) => {
            if (err) {
                console.log(err)
            }
            res.json( {postId: resPostId, status: true} );
        })
    })
}

const voting = (req, res) => {

    db.query((err, result) => {
        if (err) {
            console.log(err)
        }
    })
}


// EXPORT controllers
module.exports = {
    selectCategories,
    selectPosts,
    selectSpecificPost,
    postNewPost,
    voting
};