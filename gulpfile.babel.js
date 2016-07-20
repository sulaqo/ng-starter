'use strict';

import gulp from 'gulp';
import './tasks/build';
import './tasks/serve';
import './tasks/component';
import './tasks/s3';


gulp.task('watch', ['serve']);
gulp.task('default', ['serve']);
