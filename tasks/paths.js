'use strict';

import path        from 'path';
import colors      from 'colors';
import Environment from './envs';

const root = './src';

const targetDir = './dist';

function resolveToApp(glob = '') {
  return path.join(root, 'app', glob);
}

function resolveToComponents(glob = '') {
  return path.join(root, 'app/components', glob);
}

// map of all paths
let paths = {
  js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  less: resolveToApp('**/*.less'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: {
    app: path.join(__dirname, '../', root, 'app/app.js')
  },
  output: root
};

function getWebpackConfig(environment) {
  switch(environment) {
    case Environment.PRODUCTION:
      return require('../webpack/webpack.production.config');
    case Environment.STAGING:
      return require('../webpack/webpack.staging.config');
    case Environment.DEVELOPMENT:
      return require('../webpack/webpack.development.config');
    default:
      console.log(colors.yellow(`WARN: No valid environment found. Falling back to [${Environment.DEVELOPMENT}].`))
      return require('../webpack/webpack.development.config');
  }
}

export {root, targetDir, resolveToApp, resolveToComponents, paths, getWebpackConfig};
