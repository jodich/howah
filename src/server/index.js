const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../../webpack.config');
const compiler = webpack(webpackConfig);
const cookieParser = require('cookie-parser');
const {resolve} = require('path');
const fallback = require('express-history-api-fallback');

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

// const clientBuildPath = resolve(__dirname, '..', '..', 'public');
// app.use('/app', express.static(clientBuildPath));
// app.get('/app/*', (req, res) => res.sendFile(resolve(clientBuildPath, 'index.html')));

require('./routes')(app);

app.use(fallback(resolve(__dirname, '..', '..', 'public/index.html')));
const server = app.listen(3000, () => { console.log('listening on port 3000')});