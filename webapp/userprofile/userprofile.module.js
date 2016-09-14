angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('datamill.userprofile', {
        url: "/userprofile",
        views: {
          "content@": {
            templateUrl: "/userprofile/templates/userprofile.html",
            controller: 'userprofileCtrl'
          }
        }
      });
    }
  ]);
