const db = require('../db.js');
const cloudinary = require('cloudinary');

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
        let selectPostOptions = "SELECT * FROM options WHERE post_id = $1 ORDER BY id"
        db.query(selectPostOptions, value, (err, result) => {
            let resultOptions = result.rows
            res.json( {post: resultPost, options: resultOptions} )
        })
    })
}

const postNewPost = (req, res) => {
    let { title, question, time, date, userId, images, options, ...data } = req.body;

    let optionObj = {};

    var loopFunc = (obj, index) => {
        for (let key in obj) {
            let optionIndex = key.split('_')[1]
        
            if (!optionObj[optionIndex]) {
                 optionObj[optionIndex] = [null, null];    
            }
            optionObj[optionIndex][index] = obj[key]
        };
    }

    loopFunc(options, 0)
    loopFunc(images, 1)

    // // // FORMATTING DEADLINE'S DATETIME
    if (date) {
        let dateArr = date.split('/');
        let formatedDate = dateArr.reverse().join('-')
        var deadline = `${formatedDate} ${time}:00`
    }
    // // //

    let insertNewPost = 'INSERT INTO posts (title, question, author_id, deadline) VALUES ($1, $2, $3, $4) RETURNING *';
    let values = [title, question, userId, deadline];

    db.query(insertNewPost, values, (err, result) => {
        if (err) {
            console.log(err)
        }

        // FORMATTING INSERT OPTION QUERY
        let insertOptions = 'INSERT INTO options (post_id, option, option_image) VALUES '
        let resPostId = result.rows[0].id;
        let dataArr = []
        for (key in optionObj) {
            let content = optionObj[key][0];
            let image = optionObj[key][1];
            let data = `(${resPostId}, \'${content}\', \'${image}\')`
            dataArr.push(data)
        }
        let values = dataArr.join(', ');
        insertOptions = insertOptions + values + ' RETURNING *'
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
    let userId = req.cookies['user_id'];
    let postId = req.params.id;
    let optionId = req.params.optionId;

    let checkVote = 'SELECT * FROM votes WHERE user_id = $1 AND post_id = $2';
    let values = [userId, postId];

    db.query(checkVote, values, (err, result) => {
        if (err) {
            console.log(err)
        }

        if (result.rows.length < 1 ) {
            // there is no existing votes, may add vote;

            let insertVote = 'INSERT INTO votes (user_id, post_id, option_id) VALUES ($1, $2, $3)';
            let values = [userId, postId, optionId];
        
            db.query(insertVote, values, (err, result) => {
                if (err) {
                    console.log(err)
                }

                let selectCountVotes = 'UPDATE options SET points = (SELECT COUNT(option_id) FROM votes WHERE option_id = $1) WHERE id = $2 RETURNING *';
                let values = [optionId, optionId]
                db.query(selectCountVotes, values, (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json( {message: 'Your vote has been placed!', updatedOption: result.rows[0], status: true} )
                    }
                })
            })

        } else {
            res.json( {message: 'You have already voted', status: false} );
        }
    })
}

const postImage = (req, res) => {

    cloudinary.uploader.upload_stream((result) => {
        res.json( {url: result.secure_url, uploaded: true} )

    }).end(req.file.buffer)
}


// EXPORT controllers
module.exports = {
    selectCategories,
    selectPosts,
    selectSpecificPost,
    postNewPost,
    voting,
    postImage
};