angular.module('datamill')
  .factory('authFactory', function($http) {
    return {
      getNavbarItems: function() {
        return $http.get("http://localhost:7070/navbarItems").then(function(res) {
          return res.data;
        })
      },
      postNewDomain: function(postdata) {
        return $http({
          method: "POST",
          url: "http://localhost:7070/domain",
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
