import angular from 'angular';
import doSomethingModule from './do-something';

let commonServicesModule =  angular.module('ng-starter.common.services', [
  doSomethingModule.name,
]);

export default commonServicesModule;
