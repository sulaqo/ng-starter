'use strict';

import gulp         from 'gulp';
import webpack      from 'webpack';
import path         from 'path';
import rename       from 'gulp-rename';
import gutil        from 'gulp-util';
import clean        from 'gulp-clean';
import runSequence  from 'run-sequence';
import fileList     from 'gulp-filelist';
import yargs        from 'yargs';
import colors       from 'colors';
import colorsSupported      from 'supports-color';
import {paths, targetDir, getWebpackConfig}  from './paths';

gulp.task('build', (done) => {
  console.log(colors.blue(`INFO: Building for environment: [${yargs.argv.env}]`));
  return runSequence('dist:clean', 'webpack', 'dist:file-list', done);
});

gulp.task('dist:clean', () => {
  return gulp.src(targetDir, {read: false})
    .pipe(clean());
});

gulp.task('webpack', (done) => {
  const config = getWebpackConfig(yargs.argv.env);
  return webpackBuild(done, config);
});

gulp.task('dist:file-list', () => {
  return gulp.src([targetDir + '/*.js', '!' + targetDir + '/loader*.js', targetDir + '/*.css'])
    .pipe(fileList('files.json', { flatten: true }))
    .pipe(gulp.dest(targetDir));
});

function webpackBuild(done, config) {
  config.entry.app = paths.entry.app;

  return webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError("webpack", err);
    }
    gutil.log("[webpack]", stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));
    done();
  });
}
