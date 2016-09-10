angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('datamill.listdomain', {
          url: '/listdomain',
          views: {
            "content@": {
              templateUrl: "/domainlib/templates/listdomain.html",
              controller: 'listdomainCtrl'
            }
          }
        });
    }
  ]);
