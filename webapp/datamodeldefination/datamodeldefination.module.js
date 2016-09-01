angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('datamill.datamodeldefination', {
        url: '/datamodeldefination',
        views: {
          "content@": {
            templateUrl: "/datamodeldefination/templates/datamodeldefination.html",
            controller: 'datamodeldefinationController',
          }
        },
        params: {
          dataModel: {
            "name": '',
            "description": '',
            "attributes": []
          }
        }
      });
    }
  ]);
