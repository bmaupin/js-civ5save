const BabiliPlugin = require('babili-webpack-plugin');
var path = require('path');

module.exports = {
  entry: './src/civ5save.js',
  output: {
    filename: 'civ5save.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new BabiliPlugin()
  ]
};
