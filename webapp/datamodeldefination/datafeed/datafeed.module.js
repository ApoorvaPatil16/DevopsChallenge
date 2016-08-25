angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('datamill.datamodeldefination.datafeed', {
        url: '/datafeed',
        views: {
          "deliveryview": {
            templateUrl: "/datamodeldefination/datafeed/templates/datafeedsimulation.html",
          }
        }
      });
    }
  ]);
