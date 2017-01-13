var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = {
    resolve: {
        root: [
            path.resolve('./app')
        ]
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()] // in order to ignore all modules in node_modules folder
};