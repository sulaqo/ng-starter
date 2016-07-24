import angular from 'angular';
import doSomethingServiceFactory from './do-something.service.factory';

let doSomethingModule = angular.module('ng-starter.common.services.do-something', [])
  .factory('DoSomething', doSomethingServiceFactory);

export default doSomethingModule;
