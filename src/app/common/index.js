import angular from 'angular';
import commonServicesModule from './services';
import lodash from 'lodash';


let commonModule =  angular.module('ng-starter.common', [
  commonServicesModule.name,
]);

export default commonModule;
