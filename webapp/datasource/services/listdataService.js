angular.module('datamill')
  .factory('listdataService', function($http, $log) {
    return {
      getdatasources: function() {
        return $http.get('http://localhost:7070/datasource')
          .then(function(response) {
            $log.info(response);
            return response.data;
          });
      }
    };
  });
