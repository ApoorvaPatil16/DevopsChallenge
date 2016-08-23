angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('datamill.datamodel', {
        views: {
          "content@": {
            templateUrl: "/datamodel/templates/datamodel.html",
            controller: 'datamodelController',
          }
        }
      });
    }
  ]);
