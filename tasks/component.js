'use strict';

import path from 'path';
import gulp from 'gulp';
import yargs from 'yargs';
import template from 'gulp-template';
import rename from 'gulp-rename';
import {
  resolveToComponents,
  paths
} from './paths'

const blankTemplates = path.join(__dirname, 'generator', 'component/**/*.**');

function cap(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

gulp.task('component', () => {
  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(blankTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});
