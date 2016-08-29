angular.module('datamill')
  .factory('listDataModelsService', ['$http', '$log', function($http, $log) {
    return {
      getDatamodelsList: function() {
        return $http.get("http://localhost:7070/datamodel")
          .then(function(response) {
            return response.data;
          })
      },

      getDatamodelSearch: function(search) {
        return $http.get("http://localhost:7070/datamodel/?q=" + search)
          .then(function(response) {
            return response.data;
          })
      }
    }
  }]);
