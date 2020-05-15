const merge = require('webpack-merge')
const Dotenv = require('dotenv-webpack')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: 'server.entrypoint.bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv({
            path: './.env.production'
        })
    ]
})