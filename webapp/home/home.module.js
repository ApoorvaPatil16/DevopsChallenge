angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('home', {
        views: {
          "appBar": {
            templateUrl: "/home/templates/appBar.html",
            controller: 'appBarController',
            controllerAs: 'appBarCtrl'
          },
          "content": {
            templateUrl: "/home/templates/content.html"
          },
          "footer": {
            templateUrl: "/home/templates/footer.html"
          }
        }
      });
    }
  ]);
