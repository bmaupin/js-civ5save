var path = require('path');

var env = process.env.NODE_ENV;

module.exports = {
  entry: './src/civ5save.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: env === 'production' ? [
          'babel-loader',
          'eslint-loader'
        ] : [
          'babel-loader'
        ]
      }
    ]
  },
  output: {
    filename: env === 'production' ? 'civ5save.min.js' : 'civ5save.js',
    // library and libraryTarget are necessary so this can be imported as a module
    library: 'Civ5Save',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },
};
