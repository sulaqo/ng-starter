import <%= name %>Module from './<%= _.kebabCase(name) %>'
import <%= name %>Controller from './<%= _.kebabCase(name) %>.controller';
import <%= name %>Component from './<%= _.kebabCase(name) %>.component';
import <%= name %>Template from './<%= _.kebabCase(name) %>.html';

describe('<%= name %>', () => {
  let $rootScope, makeController;

  beforeEach(window.module(<%= name %>Module.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new <%= name %>Controller();
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
      expect(<%= name %>Template).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = <%= name %>Component;

      it('includes the intended template',() => {
        expect(component.template).to.equal(<%= name %>Template);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(<%= name %>Controller);
      });
  });
});
