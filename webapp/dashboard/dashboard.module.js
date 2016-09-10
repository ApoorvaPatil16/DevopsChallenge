angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('datamill.dashboard', {
        url: "/dashboard",
        views: {
          "content@": {
            templateUrl: "/dashboard/templates/dashboard.html",
            controller: 'dashboardCtrl'
          }
        }
      });
    }
  ]);
