angular.module('datamill')
  .factory('listDomainFactory', function($http) {
    return {
      getDomainItems: function(startValue) {
        return $http.get("/domain/notprimitive?_start=" + startValue + "&_limit=20").then(function(res) {
          //return $http.get("/domain").then(function(res) {
          return res.data;
        })
      },
      getDomainItemsByName: function(name) {
        return $http.get("/domain/notprimitive?q=" + name).then(function(res) {
          return res.data;
        })
      },
      getAllDomain: function() {
        console.log("inside list domain factory")
        return $http.get("/domain/all").then(function(res) {
          console.log("inside list domain factory")
          return res.data;
        })
      }
    }
  });
