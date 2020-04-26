const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: "production",
    entry: ['./src/index.js','./src/sass/main.scss'],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'script.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,'css-loader','sass-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                loader: 'file-loader',
                options: { outputPath: 'assets/fonts',name: "[name].[ext]"},
            },
            {
                test: /\.(png|svg|jpe?g|gif|ico)$/i,
                loader: 'file-loader',
                options: { outputPath: 'assets/image',name: "[name].[ext]" },
            },
            {
                test: /\.(mp3)$/i,
                loader: 'file-loader',
                options: { outputPath: 'assets/audio',name: "[name].[ext]" },
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            favicon: 'src/assets/icon/favicon.ico',
            template: 'src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new CopyWebpackPlugin([
            {from: './src/assets/image', to: './assets/image'},
            {from: './src/assets/audio', to: './assets/audio'}
        ])
    ],
    devServer: {
        open: true,
    },
}