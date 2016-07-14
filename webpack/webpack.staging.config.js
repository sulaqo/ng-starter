var webpack = require('webpack');
var path    = require('path');
var config  = require('./webpack.config.js');

config.output = {
  filename: '[name].bundle.js',
  publicPath: '',
  path: path.resolve(__dirname, '../dist')
};

config.plugins = config.plugins.concat([
  new webpack.NormalModuleReplacementPlugin(/env-config\/env\.config\.js/, 'env.config.staging.js'),

  // Reduces bundles total size
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require', 'angular']
    }
  })
]);

module.exports = config;
