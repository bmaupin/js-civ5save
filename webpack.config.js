const BabiliPlugin = require('babili-webpack-plugin');
var path = require('path');

module.exports = {
  entry: './src/civ5save.js',
  output: {
    filename: 'civ5save.min.js',
    // library and libraryTarget are necessary so this can be imported as a module
    library: 'Civ5Save',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new BabiliPlugin()
  ]
};
