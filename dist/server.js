/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./configs/webpack.dev.config.js":
/*!***************************************!*\
  !*** ./configs/webpack.dev.config.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar path = __webpack_require__(/*! path */ \"path\");\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\nvar HtmlWebPackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\n\nmodule.exports = {\n    entry: {\n        main: ['webpack/hot/dev-server', 'webpack-hot-middleware/client', './src/client/index.jsx']\n    },\n    output: {\n        path: path.join(__dirname, '..', 'dist'),\n        publicPath: '/',\n        filename: '[name].js'\n    },\n    mode: 'development',\n    target: 'web',\n    devtool: '#source-map',\n    module: {\n        rules: [{\n            test: /\\.(js|jsx)$/,\n            exclude: /node_modules/,\n            use: ['babel-loader']\n        }, {\n            test: /\\.s?css$/,\n            use: ['style-loader', 'css-loader', 'sass-loader']\n        }]\n    },\n    resolve: {\n        extensions: ['*', '.js', '.jsx']\n    },\n    plugins: [new HtmlWebPackPlugin({\n        template: \"./public/index.html\",\n        filename: \"./index.html\"\n    }), new webpack.HotModuleReplacementPlugin()]\n};\n\n//# sourceURL=webpack:///./configs/webpack.dev.config.js?");

/***/ }),

/***/ "./src/server/controllers/controller.js":
/*!**********************************************!*\
  !*** ./src/server/controllers/controller.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nvar db = __webpack_require__(/*! ../db.js */ \"./src/server/db.js\");\nvar cloudinary = __webpack_require__(/*! cloudinary */ \"cloudinary\");\n\nvar selectCategories = function selectCategories(req, res) {\n\n    var selectCategories = \"SELECT * FROM categories\";\n    db.query(selectCategories, function (err, result) {\n        res.json(result.rows);\n    });\n};\n\nvar selectPosts = function selectPosts(req, res) {\n\n    var selectPosts = 'SELECT * FROM posts WHERE current_timestamp < deadline';\n    // let selectPosts = \"SELECT *, AGE(deadline, current_timestamp::timestamp(0)) FROM posts WHERE current_timestamp < deadline ORDER BY age\"    \n    db.query(selectPosts, function (err, result) {\n        if (err) {\n            console.log(err);\n        }\n        res.json({ postsArr: result.rows });\n    });\n};\n\nvar selectSpecificPost = function selectSpecificPost(req, res) {\n    var postId = req.params.id;\n\n    var selectSpecificPost = \"SELECT *, AGE(deadline, current_timestamp::timestamp(0)) FROM posts WHERE id = $1\";\n    var value = [postId];\n    db.query(selectSpecificPost, value, function (err, result) {\n        var resultPost = result.rows[0];\n        var selectPostOptions = \"SELECT * FROM options WHERE post_id = $1 ORDER BY id\";\n        db.query(selectPostOptions, value, function (err, result) {\n            var resultOptions = result.rows;\n            res.json({ post: resultPost, options: resultOptions });\n        });\n    });\n};\n\nvar postNewPost = function postNewPost(req, res) {\n    var _req$body = req.body,\n        title = _req$body.title,\n        question = _req$body.question,\n        questionImg = _req$body.questionImg,\n        time = _req$body.time,\n        date = _req$body.date,\n        userId = _req$body.userId,\n        images = _req$body.images,\n        options = _req$body.options,\n        data = _objectWithoutProperties(_req$body, ['title', 'question', 'questionImg', 'time', 'date', 'userId', 'images', 'options']);\n\n    var optionObj = {};\n\n    var loopFunc = function loopFunc(obj, index) {\n        for (var key in obj) {\n            var optionIndex = key.split('_')[1];\n\n            if (!optionObj[optionIndex]) {\n                optionObj[optionIndex] = [null, null];\n            }\n            optionObj[optionIndex][index] = obj[key];\n        };\n    };\n\n    loopFunc(options, 0);\n    loopFunc(images, 1);\n\n    // // // FORMATTING DEADLINE'S DATETIME\n    if (date) {\n        var dateArr = date.split('/');\n        var formatedDate = dateArr.reverse().join('-');\n        var deadline = formatedDate + ' ' + time + ':00';\n    }\n    // // //\n\n    var insertNewPost = \"INSERT INTO posts (title, question, question_image, author_id, deadline) VALUES ($1, $2, $3, $4, $5) RETURNING *\";\n    var values = [title, question, questionImg, userId, deadline];\n\n    db.query(insertNewPost, values, function (err, result) {\n        if (err) {\n            console.log(err);\n        }\n\n        // FORMATTING INSERT OPTION QUERY\n        var insertOptions = \"INSERT INTO options (post_id, option, option_image) VALUES \";\n        var resPostId = result.rows[0].id;\n        var dataArr = [];\n        for (var key in optionObj) {\n            var content = optionObj[key][0];\n            var image = optionObj[key][1];\n            var _data = '(' + resPostId + ', \\'' + content + '\\', \\'' + image + '\\')';\n            dataArr.push(_data);\n        }\n        var values = dataArr.join(', ');\n        insertOptions = insertOptions + values + ' RETURNING *';\n        // // //\n\n        db.query(insertOptions, function (err, result) {\n            if (err) {\n                console.log(err);\n            }\n            res.json({ postId: resPostId, status: true });\n        });\n    });\n};\n\nvar voting = function voting(req, res) {\n    var userId = req.cookies['user_id'];\n    var postId = req.params.id;\n    var optionId = req.params.optionId;\n\n    var checkDeadline = \"SELECT * FROM posts WHERE id = $1 AND current_timestamp > deadline\";\n    var values = [postId];\n\n    db.query(checkDeadline, values, function (err, result) {\n        if (err) {\n            console.log(err);\n        }\n        if (result.rows.length < 1) {\n            var checkVote = \"SELECT * FROM votes WHERE user_id = $1 AND post_id = $2\";\n            var _values = [userId, postId];\n            db.query(checkVote, _values, function (err, result) {\n                if (err) {\n                    console.log(err);\n                }\n                if (result.rows.length < 1) {\n                    var insertVote = \"INSERT INTO votes (user_id, post_id, option_id) VALUES ($1, $2, $3)\";\n                    var _values2 = [userId, postId, optionId];\n                    db.query(insertVote, _values2, function (err, result) {\n                        if (err) {\n                            console.log(err);\n                        }\n                        var selectCountVotes = \"UPDATE options SET points = (SELECT COUNT(option_id) FROM votes WHERE option_id = $1) WHERE id = $2 RETURNING *\";\n                        var values = [optionId, optionId];\n                        db.query(selectCountVotes, values, function (err, result) {\n                            if (err) {\n                                console.log(err);\n                            } else {\n                                res.json({ message: 'Your vote has been placed!', updatedOption: result.rows[0], status: true });\n                            }\n                        });\n                    });\n                } else {\n                    res.json({ message: 'You have already voted', status: false });\n                }\n            });\n        } else {\n            res.json({ message: 'The time is up!', status: false });\n        }\n    });\n};\n\nvar postImage = function postImage(req, res) {\n\n    cloudinary.uploader.upload_stream(function (result) {\n        res.json({ url: result.secure_url, uploaded: true });\n    }).end(req.file.buffer);\n};\n\n// EXPORT controllers\nmodule.exports = {\n    selectCategories: selectCategories,\n    selectPosts: selectPosts,\n    selectSpecificPost: selectSpecificPost,\n    postNewPost: postNewPost,\n    voting: voting,\n    postImage: postImage\n};\n\n//# sourceURL=webpack:///./src/server/controllers/controller.js?");

/***/ }),

/***/ "./src/server/controllers/userController.js":
/*!**************************************************!*\
  !*** ./src/server/controllers/userController.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar db = __webpack_require__(/*! ../db.js */ \"./src/server/db.js\");\nvar sha256 = __webpack_require__(/*! js-sha256 */ \"js-sha256\");\n\nvar postNewUser = function postNewUser(req, res) {\n    var _req$body = req.body,\n        name = _req$body.name,\n        email = _req$body.email,\n        password = _req$body.password,\n        cmfpassword = _req$body.cmfpassword;\n\n\n    if (password == cmfpassword) {\n\n        var findExistingUser = \"SELECT * FROM users WHERE email = $1\";\n        var value = [email];\n\n        db.query(findExistingUser, value, function (err, result) {\n            if (err) {\n                console.log(err);\n            }\n            if (result.rows.length < 1) {\n                var insertNewUser = \"INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *\";\n                var values = [name, email, sha256(password)];\n\n                db.query(insertNewUser, values, function (err, result) {\n                    if (err) {\n                        console.log(err);\n                    }\n                    res.cookie('user_id', result.rows[0].id);\n                    res.json({ result: result.rows[0], message: 'successfully created user', loginStatus: true });\n                });\n            } else {\n                res.json({ message: 'email already exists', loginStatus: false });\n            }\n        });\n    } else {\n        res.json({ message: 'password does not match', loginStatus: false });\n    }\n};\n\nvar postUserLogin = function postUserLogin(req, res) {\n    var _req$body2 = req.body,\n        email = _req$body2.email,\n        password = _req$body2.password;\n\n    var findUser = \"SELECT * FROM users WHERE email = $1 and password = $2\";\n    var values = [email, sha256(password)];\n\n    db.query(findUser, values, function (err, result) {\n\n        if (result.rows.length > 0) {\n            res.cookie('user_id', result.rows[0].id);\n            res.json({ result: result.rows[0], message: 'successfully logged in', loginStatus: true });\n        } else {\n            res.json({ message: 'either email or password wrong', loginStatus: false });\n        }\n    });\n};\n\nvar selectUserPosts = function selectUserPosts(req, res) {\n\n    var userId = req.cookies['user_id'];\n    var findUserPost = \"SELECT * FROM posts WHERE author_id = $1 ORDER BY id LIMIT $2\";\n    var values = [userId, req.query.length];\n    db.query(findUserPost, values, function (err, result) {\n        if (err) {\n            console.log(err);\n        }\n        res.json({ posts: result.rows });\n    });\n};\n\nmodule.exports = {\n    postNewUser: postNewUser,\n    postUserLogin: postUserLogin,\n    selectUserPosts: selectUserPosts\n};\n\n//# sourceURL=webpack:///./src/server/controllers/userController.js?");

/***/ }),

/***/ "./src/server/db.js":
/*!**************************!*\
  !*** ./src/server/db.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar pg = __webpack_require__(/*! pg */ \"pg\");\nvar url = __webpack_require__(/*! url */ \"url\");\n\nif (process.env.DATABASE_URL) {\n\n  //we need to take apart the url so we can set the appropriate configs\n\n  var params = url.parse(process.env.DATABASE_URL);\n  var auth = params.auth.split(':');\n\n  //make the configs object\n  var configs = {\n    user: auth[0],\n    password: auth[1],\n    host: params.hostname,\n    port: params.port,\n    database: params.pathname.split('/')[1],\n    ssl: true\n  };\n} else {\n\n  var configs = {\n    user: 'jodich',\n    host: '127.0.0.1',\n    database: 'howah',\n    port: 5432\n  };\n}\n\nvar db = new pg.Pool(configs);\n\nmodule.exports = db;\n\n//# sourceURL=webpack:///./src/server/db.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar express = __webpack_require__(/*! express */ \"express\");\nvar app = express();\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\nvar webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\nvar webpackHotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\nvar webpackConfig =  false ? undefined : __webpack_require__(/*! ../../configs/webpack.dev.config */ \"./configs/webpack.dev.config.js\");\nvar compiler = webpack(webpackConfig);\nvar cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n\nvar _require = __webpack_require__(/*! path */ \"path\"),\n    resolve = _require.resolve;\n\nvar fallback = __webpack_require__(/*! express-history-api-fallback */ \"express-history-api-fallback\");\nvar cloudinary = __webpack_require__(/*! cloudinary */ \"cloudinary\");\nvar path = __webpack_require__(/*! path */ \"path\");\n\nconsole.log('the process environment is:', \"development\");\n\napp.use(webpackDevMiddleware(compiler, {\n    publicPath: webpackConfig.output.publicPath,\n    stats: {\n        colors: true\n    }\n}));\napp.use(webpackHotMiddleware(compiler));\n\napp.use(express.static('./public'));\napp.use(express.json());\napp.use(express.urlencoded({ extended: true }));\napp.use(cookieParser());\n\ncloudinary.config({\n    cloud_name: 'db2fpatds',\n    api_key: '491492416143532',\n    api_secret: 'UhXNYUV93GaYh_h0kONJYI0H61I'\n});\n\n// const clientBuildPath = resolve(__dirname, '..', '..', 'public');\n// app.use('/app', express.static(clientBuildPath));\n// app.get('/app/*', (req, res) => res.sendFile(resolve(clientBuildPath, 'index.html')));\n\napp.use(express.static(__dirname));\n\n__webpack_require__(/*! ./routes */ \"./src/server/routes.js\")(app);\n\n// send the user to index html page inspite of the url\napp.get('*', function (req, res) {\n    res.sendFile(path.resolve(__dirname, 'index.html'));\n});\n\n// app.use(fallback(resolve(__dirname, '..', '..', 'public/index.html')));\n\n// const server = app.listen(3000, () => { console.log('listening on port 3000')});\nvar server = app.listen(process.env.PORT || 3000, function () {\n    console.log('listening on port 3000');\n});\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/routes.js":
/*!******************************!*\
  !*** ./src/server/routes.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar controllers = __webpack_require__(/*! ./controllers/controller */ \"./src/server/controllers/controller.js\");\nvar userControllers = __webpack_require__(/*! ./controllers/userController */ \"./src/server/controllers/userController.js\");\n\nvar multer = __webpack_require__(/*! multer */ \"multer\");\nvar storage = multer.memoryStorage();\nvar upload = multer({ storage: storage });\n\nmodule.exports = function (app) {\n\n    app.post(\"/api/submit-new-user\", userControllers.postNewUser);\n\n    app.post(\"/api/submit-login\", userControllers.postUserLogin);\n\n    app.get(\"/api/categories\", controllers.selectCategories);\n\n    app.post(\"/api/posts/:id/option/:optionId\", controllers.voting);\n\n    app.get(\"/api/posts/:id\", controllers.selectSpecificPost);\n\n    app.get(\"/api/posts\", controllers.selectPosts);\n\n    app.get(\"/api/userposts\", userControllers.selectUserPosts);\n\n    app.post(\"/api/submit-new-post\", controllers.postNewPost);\n\n    app.post(\"/api/upload-image\", upload.single('image'), controllers.postImage);\n};\n\n//# sourceURL=webpack:///./src/server/routes.js?");

/***/ }),

/***/ "cloudinary":
/*!*****************************!*\
  !*** external "cloudinary" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cloudinary\");\n\n//# sourceURL=webpack:///external_%22cloudinary%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-history-api-fallback":
/*!***********************************************!*\
  !*** external "express-history-api-fallback" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-history-api-fallback\");\n\n//# sourceURL=webpack:///external_%22express-history-api-fallback%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "js-sha256":
/*!****************************!*\
  !*** external "js-sha256" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"js-sha256\");\n\n//# sourceURL=webpack:///external_%22js-sha256%22?");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"multer\");\n\n//# sourceURL=webpack:///external_%22multer%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pg\");\n\n//# sourceURL=webpack:///external_%22pg%22?");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"url\");\n\n//# sourceURL=webpack:///external_%22url%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-hot-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-hot-middleware%22?");

/***/ })

/******/ });