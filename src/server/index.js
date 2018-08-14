const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../../webpack.config');
const compiler = webpack(webpackConfig);
const cookieParser = require('cookie-parser');


app.use(webpackDevMiddleware(compiler, {
    stats: {
        colors: true
    }
}))
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



require('./routes')(app);


const server = app.listen(3000, () => { console.log('listening on port 3000')});