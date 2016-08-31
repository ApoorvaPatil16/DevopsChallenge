angular.module('datamill')
  .factory('datafeedService', function($http, $log) {
    return {
      getTransportType: function() {
        return $http.get('api/transporttype')
          .then(function(response) {
            $log.info(response);
            return response.data;
          });
      }
    };
  });
