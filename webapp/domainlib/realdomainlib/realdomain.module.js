angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('datamill.randomDomain', {
          url: '/newrandomdomain',
          views: {
            "content@": {
              templateUrl: "/domainlib/randomdomainlib/templates/randomdomain.html",
              controller: 'randomDomainCtrl'
            }
          },
          params: {
            realDomain: {
              "id": '',
              "name": '',
              "baseType": '',
              "pattern": '',
              "type": ''
            }
          }
        });
    }
  ]);
