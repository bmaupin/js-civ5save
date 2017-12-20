const env = process.env.NODE_ENV;
const MinifyPlugin = require('babel-minify-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/Civ5Save.js',
  module: {
    rules: [
      {
        // Fix TypeError: (0 , _typeof3.default) is not a function (https://github.com/webpack/webpack/issues/1694)
        exclude: /node_modules/,
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: [
                ['babel-plugin-transform-builtin-extend', { globals: ["DataView"] }],
                // Fix ReferenceError: regeneratorRuntime is not defined (https://stackoverflow.com/a/36821986/399105)
                ['transform-runtime']
              ]
            }
          },
          { loader: 'eslint-loader' }
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
    new MinifyPlugin()
  ] : [],
};
