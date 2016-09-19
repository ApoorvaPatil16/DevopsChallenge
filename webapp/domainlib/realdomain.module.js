angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('datamill.realDomain', {
          url: '/realdomaindomain/:mode',
          views: {
            "content@": {
              templateUrl: "/domainlib/templates/realdomain.html",
              controller: 'realDomainCtrl as realCtrl'
            }
          },
          params: {
            mode: "create",
            realDomain: {}
          }
        });
    }
  ]);
