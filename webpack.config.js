'use strict';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: path.join(__dirname,'src/index.js'),
    output: {
        path: path.resolve(__dirname ,'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },
            {
                test: /\.css$/ ,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ]
            },
            {
                test: /\.html/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src']
                    }
                }
            }
        ]
    },
    plugins: [
     new htmlWebpackPlugin({
        title: 'testplugin'
     })
    ],
    devServer: {
      contentBase: path.resolve(__dirname ,'dist'),
    },
    resolve: {
        alias: {
            assets: path.resolve(__dirname, 'src/assets')
        }
    }
}