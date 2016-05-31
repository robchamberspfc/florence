module.exports = {
  entry: {
    legacy: "./assets/js/main.js",
    app: "./js/app.js"
    },
  output: {
    filename: "./assets/js/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' }
    ],
    noParse: [
      /node_modules\\json-schema\\lib\\validate\.js/,
      /node_modueles\/json-schema\/lib\/validate\.js/
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
