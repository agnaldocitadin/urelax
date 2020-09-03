const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    externals: [nodeExternals()], // Need this to avoid error when working with Express
})