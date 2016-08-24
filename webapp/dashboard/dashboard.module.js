angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('dashboard', {
        "url": "/dashboard",
        views: {

          "appBar": {
            templateUrl: "/home/templates/appBar.html",
            controller: 'appBarCtrl',
            controllerAs: 'appbarCtrl'
          },
          "content": {
            templateUrl: "/dashboard/templates/dashboard.html",
            controller: 'dashboardCtrl'
          },
          "footer": {
            templateUrl: "/home/templates/footer.html"
          }
        }
      });
    }
  ]);
