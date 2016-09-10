angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('datamill.realDomain', {
          url: '/realdomaindomain',
          views: {
            "content@": {
              templateUrl: "/domainlib/templates/realdomain.html",
              controller: 'realDomainCtrl as realCtrl'
            }
          },
          params: {
            realDomain: {
              "id": '',
              "name": '',
              "description": '',
              "functions": '',
              "baseDataSource": '',
              "type": ''
            }
          }
        });
    }
  ]);
