const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

// process.env.NODE_ENV == 'production' ? 
//     require('../../configs/webpack.dev.config') : 
//     require('../../configs/webpack.prod.config')

module.exports = {
    entry: {
        server: './src/server/index.js',
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: path.resolve(__dirname, '..', 'dist')
    },
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
        rules: [
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}
