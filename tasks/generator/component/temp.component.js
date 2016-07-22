import template from './<%= kebabName %>.html';
import controller from './<%= kebabName %>.controller';
import './<%= kebabName %>.less';

let <%= camelName %>Component = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: controller,
  controllerAs: 'vm'
};

export default <%= camelName %>Component;
