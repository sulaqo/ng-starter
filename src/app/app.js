import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularComponent from 'angular-component';
import bootstrapJs from '../../node_modules/bootstrap/dist/js/bootstrap.min';
import AppComponent from './app.component';
import routes from './app.routes';
import packageInfo from '../../package.json';
import componentsModule from './components';
import lodash from 'lodash';
import commonModule from './common';


angular.module(lodash.kebabCase(packageInfo.name), [
    uiRouter,
    componentsModule.name,
    commonModule.name
  ])
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    $urlRouterProvider.otherwise('/');
    for (var [state, definition] of routes) {
      $stateProvider.state(state, definition);
    }
  })
  .config(($locationProvider, $httpProvider, $sceDelegateProvider, $urlRouterProvider) => {
    'ngInject';
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    enableHtml5();
    setupHttpToAllowCors();

    function enableHtml5() {
      $locationProvider.html5Mode(true).hashPrefix('!');
    }

    function setupHttpToAllowCors() {
      fixHttpProviderDefaults();
      addExpectedCorsLocationsToWhiteList()
    }

    function fixHttpProviderDefaults() {
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $httpProvider.defaults.useXDomain = true;
    }

    function addExpectedCorsLocationsToWhiteList() {
      var whiteList = ['self', '**'];
      $sceDelegateProvider.resourceUrlWhitelist(whiteList);
    }
  })
  .component('app', AppComponent);
