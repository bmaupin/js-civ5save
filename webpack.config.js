var path = require('path');

module.exports = {
  entry: './src/civ5save.js',
  output: {
    filename: 'civ5save.js',
    path: path.resolve(__dirname, 'dist')
  }
};
