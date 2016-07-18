import <%= _.capitalize(name) %>Module from './<%= name %>'
import <%= _.capitalize(name) %>Controller from './<%= name %>.controller';
import <%= _.capitalize(name) %>Component from './<%= name %>.component';
import <%= _.capitalize(name) %>Template from './<%= name %>.html';

describe('<%= _.capitalize(name) %>', () => {
  let $rootScope, makeController;

  beforeEach(window.module(<%= _.capitalize(name) %>Module.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new <%= _.capitalize(name) %>Controller();
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
      expect(<%= _.capitalize(name) %>Template).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = <%= _.capitalize(name) %>Component;

      it('includes the intended template',() => {
        expect(component.template).to.equal(<%= _.capitalize(name) %>Template);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(<%= _.capitalize(name) %>Controller);
      });
  });
});
