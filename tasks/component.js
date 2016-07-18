'use strict';

import path from 'path';
import gulp from 'gulp';
import yargs from 'yargs';
import template from 'gulp-template';
import rename from 'gulp-rename';
import lodash from 'lodash';
import packageInfo from '../package.json';

import {
  resolveToComponents,
  paths
} from './paths';

let blankTemplates = path.join(__dirname, 'generator', 'component/**/*');

function cap(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

gulp.task('component', () => {
  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || '';
  const rootModuleName = lodash.kebabCase(packageInfo.name);
  const destPath = path.join(resolveToComponents(), parentPath, lodash.kebabCase(name));

  return gulp.src(blankTemplates)
    .pipe(template({
      pascalName: lodash.upperFirst(name).replace(/\s/g,''),
      camelName: lodash.camelCase(name).replace(/\s/g,''),
      kebabName: lodash.kebabCase(name).replace(/\s/g,''),
      rootModule: rootModuleName
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', lodash.kebabCase(name));
    }))
    .pipe(gulp.dest(destPath));
});
