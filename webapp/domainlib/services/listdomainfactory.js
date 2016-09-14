angular.module('datamill')
  .factory('listDomainFactory', function($http) {
    return {
      getDomainItems: function(startValue) {
        return $http.get("/domain/getData?_start=" + startValue + "&_limit=20").then(function(res) {
          //return $http.get("/domain").then(function(res) {
          return res.data;
        })
      },
      getDomainItemsByName: function(name) {
        return $http.get("/domain/getData?q=" + name).then(function(res) {
          return res.data;
        })
      }
    }
  });
