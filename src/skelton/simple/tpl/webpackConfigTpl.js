'use strict';

module.exports = () => `'use strict';

const webpack = require('webpack');

module.exports = {
  mode: process.env.DEV ? 'development' : 'production',
  entry: {
    app: './lib/index.js'
  },

  devtool: 'source-map',
  output: {
    path: __dirname + '/asset',
    filename: '[name].js',
    publicPath: '/assets'
  },

  module: {
    rules: [{
      test: /\\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'babel-preset-env'],
          plugins: ['wildcard']
        }
      }
    }, {
      test: /\\.(woff|woff2)(\\?v=\\d+\\.\\d+\\.\\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\\.ttf(\\?v=\\d+\\.\\d+\\.\\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\\.eot(\\?v=\\d+\\.\\d+\\.\\d+)?$/,
      loader: 'file'
    }, {
      test: /\\.svg/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: __dirname + '/dist',
    hot: true,
    progress: true,
    port: 8080,
    proxy: {},
    watchContentBase: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    }
  }
};`;
