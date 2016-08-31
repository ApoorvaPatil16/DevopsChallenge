angular.module('datamill')
  .factory('listdataService', function($http, $log) {
    return {
      getdatasources: function() {
        return $http.get('api/datasource')
          .then(function(response) {
            $log.info(response);
            return response.data;
          });
      }
    };
  });
