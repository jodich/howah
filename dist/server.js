!function(e){var s={};function o(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=s,o.d=function(e,s,t){o.o(e,s)||Object.defineProperty(e,s,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,s){if(1&s&&(e=o(e)),8&s)return e;if(4&s&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&s&&"string"!=typeof e)for(var n in e)o.d(t,n,function(s){return e[s]}.bind(null,n));return t},o.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(s,"a",s),s},o.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)},o.p="/",o(o.s=5)}([function(e,s){e.exports=require("webpack")},function(e,s){e.exports=require("path")},function(e,s){e.exports=require("html-webpack-plugin")},function(e,s){e.exports=require("cloudinary")},function(e,s,o){"use strict";var t=o(17),n=o(18);if(process.env.DATABASE_URL)var r=n.parse(process.env.DATABASE_URL),i=r.auth.split(":"),a={user:i[0],password:i[1],host:r.hostname,port:r.port,database:r.pathname.split("/")[1],ssl:!0};else a={user:"jodich",host:"127.0.0.1",database:"howah",port:5432};var u=new t.Pool(a);e.exports=u},function(e,s,o){"use strict";console.log("the process environment is:","production");var t,n=o(6),r=n(),i=o(0),a=o(7),u=o(8),l=i(t=o(9)),c=o(13),p=(o(1).resolve,o(14),o(3)),d=o(1);p.config({cloud_name:"db2fpatds",api_key:"491492416143532",api_secret:"UhXNYUV93GaYh_h0kONJYI0H61I"}),r.use(a(l,{publicPath:t.output.publicPath,stats:{colors:!0}})),r.use(u(l)),r.use(n.static("./public")),r.use(n.json()),r.use(n.urlencoded({extended:!0})),r.use(c()),r.use(n.static(__dirname)),o(15)(r),r.get("*",function(e,s){s.sendFile(d.resolve(__dirname,"index.html"))});r.listen(process.env.PORT||3e3,function(){console.log("listening on port 3000")})},function(e,s){e.exports=require("express")},function(e,s){e.exports=require("webpack-dev-middleware")},function(e,s){e.exports=require("webpack-hot-middleware")},function(e,s,o){"use strict";var t=o(1),n=(o(0),o(2));e.exports={entry:{main:"./src/client/index.jsx"},output:{path:t.join(__dirname,"..","dist"),publicPath:"/",filename:"[name].js"},target:"web",mode:"production",devtool:"#source-map",module:{rules:[{test:/\.(js|jsx)$/,exclude:/node_modules/,use:["babel-loader"]},{test:/\.s?css$/,use:["style-loader","css-loader","sass-loader"]}]},resolve:{extensions:["*",".js",".jsx"]},plugins:[new n({template:"./public/index.html",filename:"./index.html"})]}},function(e,s,o){"use strict";var t=o(1),n=o(0),r=o(2);e.exports={entry:{main:["webpack/hot/dev-server","webpack-hot-middleware/client","./src/client/index.jsx"]},output:{path:t.join(__dirname,"..","dist"),publicPath:"/",filename:"[name].js"},mode:"development",target:"web",devtool:"#source-map",module:{rules:[{test:/\.(js|jsx)$/,exclude:/node_modules/,use:["babel-loader"]},{test:/\.s?css$/,use:["style-loader","css-loader","sass-loader"]}]},resolve:{extensions:["*",".js",".jsx"]},plugins:[new r({template:"./public/index.html",filename:"./index.html"}),new n.HotModuleReplacementPlugin]}},function(e,s,o){"use strict";var t=o(0),n=o(12);e.exports={target:"web",mode:"development",entry:["webpack/hot/dev-server","webpack-hot-middleware/client","./src/client/index.jsx"],module:{rules:[{test:/\.(js|jsx)$/,exclude:/node_modules/,use:["babel-loader"]},{test:/\.s?css$/,use:n.extract({fallback:{loader:"style-loader",options:{sourceMap:!1}},use:[{loader:"css-loader",options:{sourceMap:!1}},{loader:"sass-loader",options:{sourceMap:!1}}]})}]},resolve:{extensions:["*",".js",".jsx"]},output:{path:__dirname+"/dist",publicPath:"/",filename:"bundle.js"},plugins:[new n({filename:"[name].css",disable:!1}),new t.HotModuleReplacementPlugin],devServer:{hot:!0}}},function(e,s){e.exports=require("extract-text-webpack-plugin")},function(e,s){e.exports=require("cookie-parser")},function(e,s){e.exports=require("express-history-api-fallback")},function(e,s,o){"use strict";var t=o(16),n=o(19),r=o(21),i=r({storage:r.memoryStorage()});e.exports=function(e){e.get("/api/posts/:id/comments",t.loadComments),e.get("/api/posts/:id",t.selectSpecificPost),e.post("/api/posts/:id/option/:optionId",t.voting),e.post("/api/posts/:id/submit-new-comment",t.postNewComment),e.get("/api/userposts",n.selectUserPosts),e.get("/api/categories",t.selectCategories),e.get("/api/posts",t.selectPosts),e.post("/api/submit-new-user",n.postNewUser),e.post("/api/submit-login",n.postUserLogin),e.post("/api/submit-new-post",t.postNewPost),e.post("/api/upload-image",i.single("image"),t.postImage)}},function(e,s,o){"use strict";var t=o(4),n=o(3);e.exports={selectCategories:function(e,s){t.query("SELECT * FROM categories",function(e,o){s.json(o.rows)})},selectPosts:function(e,s){var o=[parseInt(e.query.limit)];t.query("SELECT * FROM posts WHERE current_timestamp < deadline ORDER BY id LIMIT $1",o,function(e,o){e&&console.log(e),s.json({postsArr:o.rows})})},selectSpecificPost:function(e,s){var o=[e.params.id];t.query("SELECT *, AGE(deadline, current_timestamp::timestamp(0)) FROM posts WHERE id = $1",o,function(e,n){var r=n.rows[0];t.query("SELECT * FROM options WHERE post_id = $1 ORDER BY id",o,function(e,o){var t=o.rows;s.json({post:r,options:t})})})},postNewPost:function(e,s){var o=e.body,n=o.title,r=o.question,i=o.questionImg,a=o.time,u=o.date,l=o.userId,c=o.images,p=o.options,d=(function(e,s){var o={};for(var t in e)s.indexOf(t)>=0||Object.prototype.hasOwnProperty.call(e,t)&&(o[t]=e[t])}(o,["title","question","questionImg","time","date","userId","images","options"]),{}),m=function(e,s){for(var o in e){var t=o.split("_")[1];d[t]||(d[t]=[null,null]),d[t][s]=e[o]}};if(m(p,0),m(c,1),u)var f=u.split("/").reverse().join("-")+" "+a+":00";var E="INSERT INTO posts (title, question, question_image, author_id, deadline) VALUES ($1, $2, $3, $4, $5) RETURNING *",g=[n,r,i,l,f];console.log(E),t.query(E,g,function(e,o){e&&console.log(e);var n="INSERT INTO options (post_id, option, option_image) VALUES ",r=o.rows[0].id,i=[];for(var a in d){var u=d[a][0];u.includes("'")&&(console.log("have"),u=u.split("'").join("''"));var l=d[a][1],c="("+r+", '"+u+"', '"+l+"')";i.push(c)}n=n+i.join(", ")+" RETURNING *",t.query(n,function(e,o){e&&console.log(e),s.json({postId:r,status:!0})})})},voting:function(e,s){var o=e.cookies.user_id,n=e.params.id,r=e.params.optionId,i=[n];t.query("SELECT * FROM posts WHERE id = $1 AND current_timestamp > deadline",i,function(e,i){if(e&&console.log(e),i.rows.length<1){var a=[o,n];t.query("SELECT * FROM votes WHERE user_id = $1 AND post_id = $2",a,function(e,i){if(e&&console.log(e),i.rows.length<1){var a=[o,n,r];t.query("INSERT INTO votes (user_id, post_id, option_id) VALUES ($1, $2, $3)",a,function(e,o){e&&console.log(e);var n=[r,r];t.query("UPDATE options SET points = (SELECT COUNT(option_id) FROM votes WHERE option_id = $1) WHERE id = $2 RETURNING *",n,function(e,o){e?console.log(e):s.json({message:"Your vote has been placed!",updatedOption:o.rows[0],status:!0})})})}else s.json({message:"You have already voted",status:!1})})}else s.json({message:"The time is up!",status:!1})})},postImage:function(e,s){n.uploader.upload_stream(function(e){s.json({url:e.secure_url,uploaded:!0})}).end(e.file.buffer)},postNewComment:function(e,s){var o=e.body,n=[o.commentInput,o.userId,e.params.id];t.query("INSERT INTO comments (content, author_id, post_id) VALUES ($1, $2, $3) RETURNING *",n,function(e,o){e&&console.log(e),s.json({newComment:o.rows[0]})})},loadComments:function(e,s){var o=[e.params.id,e.query.length];t.query("SELECT comments.*, users.user_name, users.email FROM comments INNER JOIN users ON (users.id = comments.author_id) WHERE comments.post_id = $1 ORDER BY comments.id DESC LIMIT $2",o,function(e,o){e&&console.log(e),s.json({result:o.rows})})}}},function(e,s){e.exports=require("pg")},function(e,s){e.exports=require("url")},function(e,s,o){"use strict";var t=o(4),n=o(20);e.exports={postNewUser:function(e,s){var o=e.body,r=o.name,i=o.email,a=o.password,u=o.cmfpassword;if(a==u){var l=[i];t.query("SELECT * FROM users WHERE email = $1",l,function(e,o){if(e&&console.log(e),o.rows.length<1){var u=[r,i,n(a)];t.query("INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *",u,function(e,o){e&&console.log(e),s.cookie("user_id",o.rows[0].id),s.json({result:o.rows[0],message:"successfully created user",loginStatus:!0})})}else s.json({message:"email already exists",loginStatus:!1})})}else s.json({message:"password does not match",loginStatus:!1})},postUserLogin:function(e,s){var o=e.body,r=o.email,i=o.password,a=[r,n(i)];t.query("SELECT * FROM users WHERE email = $1 and password = $2",a,function(e,o){o.rows.length>0?(s.cookie("user_id",o.rows[0].id),s.json({result:o.rows[0],message:"successfully logged in",loginStatus:!0})):s.json({message:"either email or password wrong",loginStatus:!1})})},selectUserPosts:function(e,s){var o=e.cookies.user_id,n=e.query.length,r="";switch(e.query.sortby){case"recent":r="SELECT * FROM posts WHERE author_id = $1 ORDER BY id DESC LIMIT $2";break;case"open":r="SELECT * FROM posts WHERE author_id = $1 AND current_timestamp < deadline ORDER BY id DESC LIMIT $2";break;case"closed":r="SELECT * FROM posts WHERE author_id = $1 AND current_timestamp > deadline ORDER BY id DESC LIMIT $2";break;default:r="SELECT * FROM posts WHERE author_id = $1 ORDER BY id ASC LIMIT $2"}var i=[o,n];t.query(r,i,function(e,o){e&&console.log(e),s.json({posts:o.rows})})}}},function(e,s){e.exports=require("js-sha256")},function(e,s){e.exports=require("multer")}]);