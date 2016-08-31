angular.module('datamill')
  .factory('authFactory', function($http) {
    return {
      getNavbarItems: function() {
        return $http.get("/api/navbarItems").then(function(res) {
          return res.data;
        })
      },
      postNewDomain: function(postdata) {
        return $http({
          method: "POST",
          url: "/api/domain",
          data: postdata,
          'content-type': "aplication/json"
        }).then(function(res) {
          return res.data.id;
        }, function() {
          return "Unable to create domain";
        });
      }
    }
  });
