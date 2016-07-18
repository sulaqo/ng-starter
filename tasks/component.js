'use strict';

import path from 'path';
import gulp from 'gulp';
import yargs from 'yargs';
import template from 'gulp-template';
import rename from 'gulp-rename';
import lodash from 'lodash';
import {
  resolveToComponents,
  paths
} from './paths'

let blankTemplates = path.join(__dirname, 'generator', 'component/**/*');

function cap(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

gulp.task('component', () => {
  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToComponents(), parentPath, lodash.kebabCase(name));


  return gulp.src(blankTemplates)
    .pipe(template({
      name: name
    }))
    .pipe(rename((path) => {
      console.log(path);
      path.basename = path.basename.replace('temp', lodash.kebabCase(name));
    }))
    .pipe(gulp.dest(destPath));
});
