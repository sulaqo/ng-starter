import angular from 'angular';

class helloWorldController {
  constructor($window, $log) {
    this.name = 'helloWorld';
    this.window = $window;
    this.logger = $log;
  }

  sayHello(){
    this.window.alert('Hello world');
    this.logger.log('Here you go. Now go get something done!');
  }
}

helloWorldController.$inject = ['$window', '$log'];

export default helloWorldController;
