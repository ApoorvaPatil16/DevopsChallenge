angular.module('datamill')
  .factory('authFactory', function($http) {
    return {
      getNavbarItems: function() {
        return $http.get("http://localhost:7070/navbarItems").then(function(res) {
          return res.data;

        })
      }
    }
  });
