angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider', '$authProvider',

    function($stateProvider, $urlRouterProvider, $authProvider) {
      $stateProvider.state('datamill.login', {
        url: "/login",
        views: {
          "content@": {
            templateUrl: "/login/templates/signin.html",
            controller: 'loginCtrl'
          }
        }
      });
    }
  ])
