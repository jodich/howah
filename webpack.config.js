const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
    target: 'web',
    mode: 'development',
    entry: ['./src/client/index.jsx'],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                  fallback: {
                    loader: 'style-loader',
                    options: {sourceMap: IS_DEV}
                  },
                  use: [
                    {
                      loader: 'css-loader',
                      options: {
                        // localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        sourceMap: IS_DEV},
                    },
                    {
                      loader: 'sass-loader',
                      options: {sourceMap: IS_DEV}
                    }
                  ]
                })
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: `${__dirname}/dist`,
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [new ExtractTextPlugin({
        filename: '[name].css',
        disable: IS_DEV
        }), 
      new webpack.HotModuleReplacementPlugin()],
    devServer: {
        hot: true
    }
}