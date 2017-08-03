const BabiliPlugin = require('babili-webpack-plugin');
var path = require('path');

var env = process.env.NODE_ENV;

module.exports = {
  entry: './src/civ5save.js',
  module: env === 'production' ? {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader'
        }
      }
    ]
  } : {},
  output: {
    filename: env === 'production' ? 'civ5save.min.js' : 'civ5save.js',
    // library and libraryTarget are necessary so this can be imported as a module
    library: 'Civ5Save',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: env === 'production' ? [
    new BabiliPlugin()
  ] : [],
};
