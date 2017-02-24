let path = require('path');
let testPath = path.join(__dirname, '../test/index.js')

module.exports = {
  entry: testPath,
  output: {
    path: __dirname,
    filename: 'test-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}