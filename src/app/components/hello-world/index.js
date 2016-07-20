import angular from 'angular';
import uiRouter from 'angular-ui-router';
import HelloWorldComponent from './hello-world.component';

let helloWorldModule = angular
  .module('ng-starter.components.hello-world', [])
  .component('helloWorld', HelloWorldComponent);

export default helloWorldModule.name;
