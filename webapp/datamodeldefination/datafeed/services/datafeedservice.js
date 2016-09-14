angular.module('datamill')
  .factory('datafeedService', function($http, $log) {
    return {
      getTransportType: function() {
        return $http.get('datamodel/transporttype')
          .then(function(response) {
            return response.data;
          });
      }
    };
  });
