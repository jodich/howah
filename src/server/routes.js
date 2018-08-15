const controllers = require('./controllers/controller')
const userControllers = require('./controllers/userController')

// const axios = require('axios');
const cloudinary = require('cloudinary');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({ 
  cloud_name: 'db2fpatds', 
  api_key: '491492416143532', 
  api_secret: 'UhXNYUV93GaYh_h0kONJYI0H61I'
});

module.exports = (app) => {

    app.post('/api/submit-new-user', userControllers.postNewUser);

    app.post('/api/submit-login', userControllers.postUserLogin);

    app.get('/api/categories', controllers.selectCategories);

    app.post('/api/posts/:id/option/:optionId', controllers.voting)

    app.get('/api/posts/:id', controllers.selectSpecificPost);
    
    app.get('/api/posts', controllers.selectPosts);

    app.post('/api/submit-new-post', controllers.postNewPost);

    app.post('/api/upload-image', upload.single('image'), controllers.postImage);

}