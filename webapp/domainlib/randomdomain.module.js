angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('datamill.randomDomain', {
          url: '/randomdomain/:mode',
          views: {
            "content@": {
              templateUrl: "/domainlib/templates/randomdomain.html",
              controller: 'randomDomainCtrl'
            }
          },
          params: {
            mode: "create",
            randomDomain: {
              "id": '',
              "name": '',
              "baseType": '',
              "pattern": '',
              "type": '',
              "isEditable": 'false'
            }
          }
        });
    }
  ]);
