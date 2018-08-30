// for addOptions in newForm
// worked. but too long winded and functions not working as expected
        // let count = this.state.count
        // let optionsArr = document.querySelectorAll('.opt');
        // let optionLast = optionsArr[optionsArr.length - 1]; // can change optionsArr.length to count later
        // let newOption = optionLast.cloneNode(true);

        // count = count + 1
        // let field = `option_${count}`;
        // this.setState( { [field]: null, count: count } )
        
        // newOption.id = `opt-${count}` 
        // newOption.childNodes[0].innerHTML = '';
        // newOption.childNodes[1].childNodes[1].innerHTML = '';
        
        // // Making new fields
        // var newTextarea = document.createElement('textarea')
        // newTextarea.id = `option_${count}`
        // newTextarea.className = `option_${count} validate materialize-textarea`
        // newTextarea.required = true
        // newTextarea.onkeyup = (event) => {this.changeHandler(event)}
        // newOption.childNodes[0].appendChild(newTextarea)

        // var newLabel = document.createElement('label')
        // newLabel.htmlFor = `option_${count}`
        // newLabel.textContent = `Option ${count}`
        // newOption.childNodes[0].appendChild(newLabel)
        
        // var newFileInput = document.createElement('input');
        // newFileInput.className = `file-path option_${count}`
        // newFileInput.type = "text"
        // newOption.childNodes[1].childNodes[0].childNodes[1].id = `file-option_${count}`
        // newOption.childNodes[1].childNodes[0].onChange = (event) => {this.changeFileHandler(event)}
        // newOption.childNodes[1].childNodes[1].appendChild(newFileInput)

        // optionLast.parentNode.insertBefore(newOption, optionLast.nextSibling);













        
        // const postNewPost = (req, res) => {
        //         let { title, question, time, date, userId, hasPerformedAjax, postId, count, uploaded, ...options } = req.body;
            
        //         // // // FORMATTING THE OPTIONS NICELY
        //         let optionObj = {}
        //         for (let key in options) {
        //             optionIndex = key.split('_')[1];
        //             optionType = key.split('_')[0];
            
        //             if (!optionObj[optionIndex]) {
        //                 optionObj[optionIndex] = [null, null];
        //             }
            
        //             if (optionType == 'option') {
        //                 optionObj[optionIndex][0] = options[key]
        //             } else if (optionType == 'image') {
        //                 optionObj[optionIndex][1] = options[key]
        //             }
        //         }
        //         // // //
            
            
        //         // // // FORMATTING DEADLINE'S DATETIME
        //         if (date) {
        //             let dateArr = date.split('/');
        //             let formatedDate = dateArr.reverse().join('-')
        //             var deadline = `${formatedDate} ${time}:00`
        //         }
        //         // // //
            
        //         let insertNewPost = 'INSERT INTO posts (title, question, author_id, deadline) VALUES ($1, $2, $3, $4) RETURNING *';
        //         let values = [title, question, userId, deadline];
            
        //         db.query(insertNewPost, values, (err, result) => {
        //             if (err) {
        //                 console.log(err)
        //             }
            
        //             // FORMATTING INSERT OPTION QUERY
        //             let insertOptions = 'INSERT INTO options (post_id, option, option_image) VALUES '
        //             let resPostId = result.rows[0].id;
        //             let dataArr = []
        //             for (key in optionObj) {
        //                 let content = optionObj[key][0];
        //                 let image = optionObj[key][1];
        //                 let data = `(${resPostId}, \'${content}\', \'${image}\')`
        //                 dataArr.push(data)
        //             }
        //             let values = dataArr.join(', ');
        //             insertOptions = insertOptions + values + ' RETURNING *'
        //             // // //
            
        //             db.query(insertOptions, (err, result) => {
        //                 if (err) {
        //                     console.log(err)
        //                 }
        //                 res.json( {postId: resPostId, status: true} );
        //             })
        //         })
        //     }





// const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const path = require('path');
// const nodeExternals = require('webpack-node-externals');
// const HtmlWebPackPlugin = require("html-webpack-plugin");

// const IS_DEV = process.env.NODE_ENV !== 'production';

// module.exports = {
//     target: 'node',
//     node: {
//         // Need this when working with express, otherwise the build fails
//         __dirname: false,   // if you don't put this is, __dirname
//         __filename: false,  // and __filename return blank or /
//     },
//     externals: [nodeExternals()], // Need this to avoid error when working with Express
//     mode: 'development',
//     entry: [ 'webpack/hot/dev-server', 'webpack-hot-middleware/client', './src/client/index.jsx' ],
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: /node_modules/,
//                 use: ['babel-loader']
//             },
//             {
//                 test: /\.s?css$/,
//                 use: ExtractTextPlugin.extract({
//                   fallback: {
//                     loader: 'style-loader',
//                     options: {sourceMap: IS_DEV}
//                   },
//                   use: [
//                     {
//                       loader: 'css-loader',
//                       options: {
//                         // localIdentName: '[path][name]__[local]--[hash:base64:5]',
//                         sourceMap: IS_DEV},
//                     },
//                     {
//                       loader: 'sass-loader',
//                       options: {sourceMap: IS_DEV}
//                     }
//                   ]
//                 })
//             }
//         ]
//     },
//     resolve: {
//         extensions: ['*', '.js', '.jsx']
//     },
//     output: {
//         publicPath: '/',
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'dist')
//     },
//     plugins: [
//     new ExtractTextPlugin({
//         filename: '[name].css',
//         disable: IS_DEV,
//     }), 
//     // new webpack.HotModuleReplacementPlugin(),
//     new HtmlWebPackPlugin({
//         template: "./public/index.html",
//         filename: "./index.html",
//         excludeChunks: [ 'server' ]
//     })
//     ],
//     devServer: {
//         contentBase: "./dist",
//         hot: true,
//         port: 3000,
//         historyApiFallback: true,
//         inline: true
//     }
// }