angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('datamill.datasource', {
        url: '/datasource',
        views: {
          "content@": {
            templateUrl: "/datasource/templates/datasource.html",
            controller: 'datasourceController',
          }
        }
      })
      .state('datamill.createdatasource',{
        url: '/createdatasource',
        views: {
          "content@": {
            templateUrl: "/datasource/templates/createdatasource.html",
            controller: 'createdatasourceController as ctrl'
          }
        },
        params:{user:{tags:[]}}
      });
    }
  ]);
