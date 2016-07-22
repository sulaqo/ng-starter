import angular from 'angular';

class <%= camelName %>Controller {
  constructor($window, $log) {
    this.name = '<%= camelName %>';
    this.window = $window;
    this.logger = $log;
  }

  sayHello(){
    this.window.alert('Hello world');
    this.logger.log('Here you go. Now go get something done!');
  }
}

<%= camelName %>Controller.$inject = ['$window', '$log'];

export default <%= camelName %>Controller;
