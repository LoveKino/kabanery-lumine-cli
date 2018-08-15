'use strict';

module.exports = () => `'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.DEV ? 'development' : 'production',
  entry: {
    app: './lib/index.js'
  },

  devtool: 'source-map',
  output: {
    path: __dirname + '/dist/assets/',
    filename: process.env.DEV ? '[name].js': '[name].[hash].js',
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
      test: /\\.css$/,
      use: ['style-loader', 'css-loader']
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
      test: /\\.(png|jp(e*)g|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8000, // Convert images < 8kb to base64 strings
          name: 'images/[hash]-[name].[ext]'
        }
      }]
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './lib/index.html.tpl'),
      filename: path.join(__dirname, './dist/index.html')
   	})
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
