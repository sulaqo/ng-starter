'use strict';

import gulp from 'gulp';
import fs from 'fs-extra';
import git from 'git-rev-sync';
import rename from 'gulp-rename';
import runSequence from 'run-sequence';
import yargs from 'yargs';
import jsonfile from 'jsonfile';
import moment from 'moment';
import syncRequest from 'sync-request';
import colors from 'colors';
import path from 'path';
import Environment from './envs';
import zip from 'gulp-zip';
import {
  targetDir
} from './paths';
import packageInfo from '../package.json';


let argv = yargs.argv;

let DIRECTORY_TO_DEPLOY = targetDir;

var publisher;
var PACKAGE_NAME;
let DEPLOYMENT_ID = git.long();

gulp.task('artifact:zip', (done) => {
  verifyEnvironment();
  runSequence('build', 'artifact:makezip', done);
});

gulp.task('artifact:makezip', function() {
  return gulp.src(resolveToDist('/**'))
    .pipe(rename(function(filePath) {
      filePath.dirname = path.join(packageInfo.name, filePath.dirname);
    }))
    .pipe(zip(packageInfo.name + '-' + DEPLOYMENT_ID + '.zip'))
    .pipe(gulp.dest('artifacts'));
});

function resolveToDist(glob = '') {
  return path.join(DIRECTORY_TO_DEPLOY, glob);
}

function verifyEnvironment() {
  if (!argv.env || (!Environment.allEnvironments.some(x => x === argv.env))) {
    console.log(colors.bold.red('\nERROR: You must provide a valid environment.'));
    console.log(`Sample usage:\n$ gulp <TASK> --env <ENV> (ENV in [${Environment.allEnvironments}]`);
    throw new Error('nERROR: You must provide a valid environment');
  }
}
