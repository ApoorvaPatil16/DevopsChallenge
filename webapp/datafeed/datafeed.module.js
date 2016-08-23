angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('datamill.datafeed', {
        views: {
          "content@": {
            templateUrl: "/datafeed/templates/datafeedsimulation.html",
            // controller: 'contentController'
          }
        }
      });
    }
  ]);
