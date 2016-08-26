angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('datamill.listdomain', {
          url: '/listdomain',
          views: {
            "content@": {
              templateUrl: "/domainlib/listdomain/templates/listdomain.html",
              controller: 'listdomainCtrl'
            }
          }
        });
    }
  ]);
