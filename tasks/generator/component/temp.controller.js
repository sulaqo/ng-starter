import angular from 'angular';

class <%= pascalName %>Controller {
  constructor($window, $log) {
    this.name = '<%= pascalName %>';
    this.window = $window;
    this.logger = $log;
  }

  sayHello(){
    this.window.alert('Hello world');
    this.logger.log('Here you go. Now go get something done!');
  }
}

<%= pascalName %>Controller.$inject = ['$window', '$log'];

export default <%= pascalName %>Controller;
