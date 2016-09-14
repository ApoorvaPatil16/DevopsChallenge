angular.module('datamill')
  .factory('authFactory', function($http) {
    return {
      getNavbarItems: function() {
        return $http.get("/navbarItems").then(function(res) {
          return res.data;
        })
      }
    }
  });
