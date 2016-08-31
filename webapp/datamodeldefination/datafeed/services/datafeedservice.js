angular.module('datamill')
  .factory('datafeedService', function($http, $log) {
    return {
      getTransportType: function() {
        return $http.get('api/transporttype')
          .then(function(response) {
            return response.data;
          });
      }
    };
  });
