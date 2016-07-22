import template from './hello-world.html';
import controller from './hello-world.controller';
import './hello-world.less';

let helloWorldComponent = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: controller,
  controllerAs: 'vm'
};

export default helloWorldComponent;
