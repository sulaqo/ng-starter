import angular from 'angular';
import uiRouter from 'angular-ui-router';
import helloWorldComponent from './hello-world.component';

let helloWorldModule = angular
  .module('ng-starter.components.hello-world', [])
  .component('helloWorld', helloWorldComponent);

export default helloWorldModule;
