'use strict';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');
const webpack = require('webpack');
module.exports = {
    entry: path.join(__dirname,'src/index.js'),
    output: {
        path: path.resolve(__dirname ,'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
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
            },
            {
                test: /\.pug/,
                use: {
                    loader: 'pug-loader',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ]
            },
        ]
    },
    plugins: [
     new htmlWebpackPlugin({
        template: path.join(__dirname,'src/index.pug')
    }),
    new RuntimeAnalyzerPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
       name: 'common'
     }),
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
