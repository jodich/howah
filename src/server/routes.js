const controllers = require('./controllers/controller')
const userControllers = require('./controllers/userController')

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = (app) => {

    app.get("/api/posts/:id/comments", controllers.loadComments);
    app.get("/api/posts/:id", controllers.selectSpecificPost);
    app.post("/api/posts/:id/option/:optionId", controllers.voting);
    app.post("/api/posts/:id/submit-new-comment", controllers.postNewComment);
    
    app.get("/api/userposts", userControllers.selectUserPosts);
    app.get("/api/categories", controllers.selectCategories);
    app.get("/api/posts", controllers.selectPosts);
    app.post("/api/submit-new-user", userControllers.postNewUser);
    app.post("/api/submit-login", userControllers.postUserLogin);
    app.post("/api/submit-new-post", controllers.postNewPost);
    app.post("/api/upload-image", upload.single('image'), controllers.postImage);

}