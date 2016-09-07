angular.module('datamill')
  .factory('listDomainFactory', function($http) {
    return {
      getDomainItems: function(startValue) {
        return $http.get("api/domain?_start=" + startValue + "&_limit=20").then(function(res) {
          return res.data;
        })
      },
      getDomainItemsByName: function(name) {
        return $http.get("api/domain/?q=" + name).then(function(res) {
          return res.data;
        })
      }
    }
  });
