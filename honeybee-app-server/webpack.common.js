const path = require('path')

module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: {
        server: './src/core/server.entrypoint.ts'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'server.entrypoint.js'
    },
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    module: {
        rules: [
            // Transpiles ES6-8 into ES5
            { 
                test: /\.(tsx|ts|js)$/, 
                exclude: /node_modules/, 
                use: "babel-loader"
            },
            { 
                test: /\.(key|cert)$/,
                exclude: /node_modules/, 
                loader: "file-loader",
                options: {
                    outputPath: 'security',
                    name: '[name].[ext]'
                }
            },
            { 
                test: /\.(proto)$/,
                exclude: /node_modules/, 
                loader: "file-loader",
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: []
}