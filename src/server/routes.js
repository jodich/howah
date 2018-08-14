const controllers = require('./controllers/controller')
const userControllers = require('./controllers/userController')

module.exports = (app) => {

    app.post('/api/submit-new-user', userControllers.postNewUser);

    app.post('/api/submit-login', userControllers.postUserLogin);

    app.get('/api/categories', controllers.selectCategories);

    app.post('/api/posts/:id/option/:optionId', controllers.voting)

    app.get('/api/posts/:id', controllers.selectSpecificPost);
    
    app.get('/api/posts', controllers.selectPosts);

    app.post('/api/submit-new-post', controllers.postNewPost);

}