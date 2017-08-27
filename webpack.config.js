const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');

var env = process.env.NODE_ENV;

module.exports = {
  entry: './src/Civ5Save.js',
  module: {
    rules: [
      {
        // Fix TypeError: (0 , _typeof3.default) is not a function (https://github.com/webpack/webpack/issues/1694)
        exclude: /node_modules/,
        test: /\.js$/,
        use: env === 'production' ? [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: [
                ['babel-plugin-transform-builtin-extend', { globals: ["DataView"] }],
                // Fix ReferenceError: regeneratorRuntime is not defined (https://stackoverflow.com/a/36821986/399105)
                ['transform-runtime', { 'polyfill': false }]
              ]
            }
          },
          { loader: 'eslint-loader' }
        ] : [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: [
                ['babel-plugin-transform-builtin-extend', { globals: ["DataView"] }],
                ['transform-runtime', { 'polyfill': false }]
              ]
            }
          }
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
  plugins: env === 'production' ? [
    new UglifyJSPlugin()
  ] : [],
};
