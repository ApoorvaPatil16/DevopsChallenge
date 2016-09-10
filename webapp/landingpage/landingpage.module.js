angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('datamill.about', {
          url: '/datamill',
          views: {
            "content@": {
              templateUrl: "/landingpage/templates/landingpage.html",
              controller: 'landingpageCtrl'
            }
          }
        });
    }
  ]);
