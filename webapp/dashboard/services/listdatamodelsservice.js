angular.module('datamill')
  .factory('listDataModelsService', ['$http', '$log', function($http, $log) {
    return {
      getDatamodelsList: function() {
        return $http.get("/datamodel")
          .then(function(response) {
            return response.data;
          })
      },

      getDatamodelSearch: function(search) {
        return $http.get("/datamodel/?q=" + search)
          .then(function(response) {
            return response.data;
          })
      }
    }
  }]);
