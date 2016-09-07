angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('datamill.datamodeldefination', {
        url: '/datamodeldefination/:mode',
        views: {
          "content@": {
            templateUrl: "/datamodeldefination/templates/datamodeldefination.html",
            controller: 'datamodeldefinationController',
          }
        },
        params: {
          mode: "create",
          dataModel: {
            "name": '',
            "description": '',
            "attributes": []
          }
        }
      });
    }
  ]);
