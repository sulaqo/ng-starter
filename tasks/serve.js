'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack';
import serve    from 'browser-sync';
import yargs    from 'yargs';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpachHotMiddelware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import historyApiFallback   from 'connect-history-api-fallback';
import {paths, targetDir, getWebpackConfig} from './paths';

gulp.task('serve', ['build'], () => {
  const config = getWebpackConfig(yargs.argv.env);
  serveForConfig(config);
});

function serveForConfig(config) {
  config.entry.app = [
    // this modules required to make HRM working
    // it responsible for all this webpack magic
    'webpack-hot-middleware/client?reload=true',
    // application entry point
    paths.entry.app
  ];

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);

  var compiler = webpack(config);

  serve({
    port: process.env.PORT || 3000,
    open: false,
    server: {
      baseDir: targetDir,
      directory: true
    },
    https: true,
    middleware: [
      function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      },
      historyApiFallback(),
      webpackDevMiddelware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpachHotMiddelware(compiler)
    ]
  });
}
