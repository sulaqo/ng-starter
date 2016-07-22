import angular from 'angular';
import uiRouter from 'angular-ui-router';
import <%= camelName %>Component from './<%= kebabName %>.component';

let <%= camelName %>Module = angular
  .module('<%= rootModule %>.components.<%= kebabName %>', [])
  .component('<%= camelName %>', <%= camelName %>Component);

export default <%= camelName %>Module;
