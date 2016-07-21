import angular from 'angular';

class HelloWorldController {
  constructor($window, $log) {
    this.name = 'HelloWorld';
    this.window = $window;
    this.logger = $log;
  }

  sayHello(){
    this.window.alert('Hello world');
    this.logger.log('Here you go. Now go get something done!');
  }
}

HelloWorldController.$inject = ['$window', '$log'];

export default HelloWorldController;
