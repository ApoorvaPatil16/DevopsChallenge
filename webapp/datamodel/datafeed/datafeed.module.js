angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('datamill.datamodel.datafeed', {
        url: '/datafeed',
        views: {
          "deliveryview": {
            templateUrl: "/datamodel/datafeed/templates/datafeedsimulation.html",
          }
        }
      });
    }
  ]);
