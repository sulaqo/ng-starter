var path    = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',
  entry: {},
  module: {
    loaders: [
       { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
       { test: /bootstrap(\.min)?\.js$/, loader: 'imports?jQuery=jquery' },
       { test: /\.html$/, loader: 'raw' },
       { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
       { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') },
       { test: /\.(woff|woff2)(\?.+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
       { test: /\.ttf(\?.+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
       { test: /\.eot(\?.+)?$/, loader: 'file'},
       { test: /\.svg(\?.+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  },
  externals: [
    {
      // 'jquery': 'jQuery',
      // 'angular': 'angular',
      // 'angular-ui-router': "'ui.router'"
    }
  ],
  plugins: [
    new HtmlWebpackPlugin({
      entry: 'app.bundle.js',
      template: 'src/index.html',
      inject: 'body',
      hash: true
    }),

    new ExtractTextPlugin("[name].bundle.css")
  ]
};

/*
 Consider the following exlusions for optimizations
 'jquery',
 'angular',
 'angular-animate',
 'angular-cookies',
 'angular-moment',
 'angular-route',
 'angular-sanitize',
 'angular-translate',
 'angular-translate-interpolation-messageformat',
 'angular-translate-loader-static-files',
 'angular-ui-router',
 'angular-ui-router-title',
 'angular-modal-service',
 'ng-browser-info',
 'log-it-down',
 'messageformat',
 'angular-file-upload-all';
 */
