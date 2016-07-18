import angular from 'angular';
import uiRouter from 'angular-ui-router';
import <%= pascalName %>Component from './<%= kebabName %>.component';

let <%= camelName %>Module = angular.module('<%= rootModule %>.components.<%= kebabName %>', [
  uiRouter
])
.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state('<%= camelName %>', {
      url: '/<%= kebabName %>',
      template: '<<%= kebabName %>></<%= kebabName %>>'
    });
}])
.component('<%= camelName %>', <%= pascalName %>Component);

export default <%= camelName %>Module.name;
