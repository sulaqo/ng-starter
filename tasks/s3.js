'use strict';

import gulp from 'gulp';
import fs from 'fs-extra';
import awspublish from 'gulp-awspublish';
import git from 'git-rev-sync';
import rename from 'gulp-rename';
import runSequence from 'run-sequence';
import yargs from 'yargs';
import AWS from 'aws-sdk';
import jsonfile from 'jsonfile';
import moment from 'moment';
import syncRequest from 'sync-request';
import colors from 'colors';
import path from 'path';
import Environment from './envs';
import {
  targetDir
} from './paths';
import packageInfo from '../package.json';
import awsInfo from '../aws.json';


let argv = yargs.argv;

let DIRECTORY_TO_DEPLOY = targetDir;

var publisher;
var ROOT_FOLDER;
var ENVIRONMENT;
let DEPLOYMENT_ID = git.long();

gulp.task('s3:deliver', (done) => {
  // so, publishing goes only from CI
  setupPublisher();
  runSequence('build', 's3:upload', done);
});


//https://www.npmjs.com/package/gulp-awspublish
gulp.task('s3:upload', function() {
  setupPublisher();
  var headers = {
    'Cache-Control': 'max-age=315360000, public'
  };
  return gulp.src(resolveToDist('/**'))
    .pipe(rename(function(filePath) {
      filePath.dirname = path.join(ROOT_FOLDER, DEPLOYMENT_ID, filePath.dirname);
    }))
    .pipe(awspublish.gzip({
      ext: ''
    }))
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});


// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
function setupPublisher() {
  verifyEnvironment();
  ENVIRONMENT = argv.env;
  var credentials = new AWS.SharedIniFileCredentials({profile: process.env.AWS_PROFILE});
  AWS.config.credentials = credentials;
  var awsSettings = awsInfo.s3[ENVIRONMENT];
  AWS.config.update(awsSettings);
  ROOT_FOLDER = packageInfo.name;
  awsSettings.rootFolder = ROOT_FOLDER;
  publisher = awspublish.create(awsSettings);

}

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
