import angular from 'angular';
import uiRouter from 'angular-ui-router';
import helloWorldComponent from './hello-world.component';

let helloWorldModule = angular
  .module('ng-starter.components.hello-world', ['ng-starter.common'])
  .component('helloWorld', helloWorldComponent);

export default helloWorldModule;
