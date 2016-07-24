import angular from 'angular';

class helloWorldController {
  constructor($window, $log, DoSomethingService) {
    this.name = 'helloWorld';
    this.window = $window;
    this.logger = $log;
    this.doSomethingService = DoSomethingService;
  }

  sayHello(){
    this.window.alert('Hello world');
    this.logger.log('Here you go. Now go get something done!');
    this.doSomethingService.doSomethingLater('Test this shit');
  }
}

helloWorldController.$inject = ['$window', '$log', 'DoSomething'];

export default helloWorldController;
