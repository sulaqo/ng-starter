import angular from 'angular';
import uiRouter from 'angular-ui-router';
import <%= name %>Component from './<%= _.kebabCase(name) %>.component';

let <%= name %>Module = angular.module('<%= rootModule %>.components.<%= _.kebabCase(name) %>', [
  uiRouter
])
.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('<%= name %>', {
      url: '/<%= _.kebabCase(name) %>',
      template: '<<%= _.kebabCase(name) %>></<%= _.kebabCase(name) %>>'
    });
}])
.component('<%= name %>', <%= name %>Component);

export default <%= name %>Module;
