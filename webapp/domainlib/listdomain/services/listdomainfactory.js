angular.module('datamill')
  .factory('listDomainFactory', function($http) {
    return {
      getDomainItems: function() {
        return $http.get("http://localhost:7070/domain").then(function(res) {
          return res.data;
        })
      },
      getDomainItemsByName: function(name) {
        return $http.get("http://localhost:7070/domain/?name_like=" + name).then(function(res) {
          return res.data;
        })
      }
    }
  });
