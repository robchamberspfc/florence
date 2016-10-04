var path = require('path');

module.exports = {
    entry: {
        legacy: "./assets/js/main.js",
        app: "./app/app.js"
    },
    output: {
        filename: "./assets/js/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.handlebars$/,
                loader: "handlebars-loader",
                query: {
                    helperDirs: [__dirname + "/app/shared/templateHelpers"],
                    compat: ''
                }
            }
        ],
        noParse: [
            /node_modules\\json-schema\\lib\\validate\.js/,
            /node_modueles\/json-schema\/lib\/validate\.js/
        ]
    },
    resolve: {
        root: [
            path.resolve('./app')
        ]
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    devtool: "cheap-module-eval-source-map"
};
