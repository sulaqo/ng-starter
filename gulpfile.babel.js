'use strict';

import gulp from 'gulp';
import './tasks/build';
import './tasks/serve';
import './tasks/component';
import './tasks/s3';
import './tasks/artifact';


gulp.task('watch', ['serve']);
gulp.task('default', ['serve']);
