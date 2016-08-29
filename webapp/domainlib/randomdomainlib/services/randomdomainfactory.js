angular.module('datamill')
  .factory('randomDomainFactory', function($http) {
    return {
      getRandomDomainItems: function() {
        return $http.get("http://localhost:7070/randomDomainLibData").then(function(res) {
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
