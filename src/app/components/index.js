import angular from 'angular';
import packageInfo from '../../../package.json';
import lodash from 'lodash';
import helloWorld from './hello-world';

let componentModule = angular.module(lodash.kebabCase(packageInfo.name) + '.components', [
  helloWorld,
]).name;

export default componentModule;
