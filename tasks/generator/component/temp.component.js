import template from './<%= _.kebabCase(name) %>.html';
import controller from './<%= _.kebabCase(name) %>.controller';
import './<%= _.kebabCase(name) %>.less';

let <%= name %>Component = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: [controller],
  controllerAs: 'vm'
};

export default <%= name %>Component.name;
