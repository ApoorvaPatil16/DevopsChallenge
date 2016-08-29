angular.module('datamill')
  .factory('listDomainFactory', function($http) {
    return {
      getDomainItems: function(startValue) {
        return $http.get("http://localhost:7070/domain?_start=" + startValue + "&_limit=10").then(function(res) {
          return res.data;
        })
      },
      getDomainItemsByName: function(name) {
        return $http.get("http://localhost:7070/domain/?q=" + name).then(function(res) {
          return res.data;
        })
      }
    }
  });
