import angular from 'angular';
import packageInfo from '../../../package.json';
import lodash from 'lodash';
import helloWorldModule from './hello-world';

let componentModule = angular.module('ng-starter.components', [
  helloWorldModule.name,
]);

export default componentModule;
