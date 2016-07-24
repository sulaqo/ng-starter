class DoSomethingService {
  constructor($q, $timeout, $window) {
    this._$q = $q;
    this._$timeout = $timeout;
    this._$window = $window;
  }

  doSomethingLater(someArgument) {
    var defer = this._$q.defer();
    this._$timeout(() => {
      this._$window.alert(someArgument);
      defer.resolve();
    }, 2000);
    return defer.promise;
  }
}

let DoSomethingServiceFactory = ($q, $timeout, $window) => {
  "ngInject";
  return new DoSomethingService($q, $timeout, $window);
};

export default DoSomethingServiceFactory
