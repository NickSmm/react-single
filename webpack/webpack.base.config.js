const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
console.log(__dirname);
module.exports = {
    entry: {index: path.resolve(__dirname, '../src/index.js')},
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'font/',
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: '[name]_[hash].[ext]',
                            outputPath: 'imgs/',
                            limit: 2048
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader, 'css-loader', 'postcss-loader',]
            },
            {
                test: /\.scss$/,
                use: [MiniCSSExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env', {useBuiltIns: 'usage', 'corejs': '2'}],
                            '@babel/preset-react'
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({}),
        new MiniCSSExtractPlugin({
            filename: 'css/[name].[contentHash:8].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: "index.html",
            chunks: ['index', 'vendor', 'common'],
            hash: true
        })
    ]
}
