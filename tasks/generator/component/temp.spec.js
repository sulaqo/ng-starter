import <%= pascalName %>Module from './index'
import <%= pascalName %>Controller from './<%= kebabName %>.controller';
import <%= pascalName %>Component from './<%= kebabName %>.component';
import <%= pascalName %>Template from './<%= kebabName %>.html';

describe('<%= camelName %>', () => {
  let $rootScope, makeController;

  beforeEach(window.module(<%= camelName %>Module.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new <%= pascalName %>Controller();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(<%= pascalName %>Template).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = <%= pascalName %>Component;

      it('includes the intended template',() => {
        expect(component.template).to.equal(<%= pascalName %>Template);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(<%= pascalName %>Controller);
      });
  });
});
