const { merge } = require('webpack-merge')
const Dotenv = require('dotenv-webpack')
const common = require('./webpack.common.js')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv({
            path: './.env.production'
        })
    ]
})