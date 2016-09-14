angular.module('datamill')
  .factory('randomDomainFactory', function($http) {
    return {
      getRandomDomainItems: function() {
        return $http.get("/primitiveDomains").then(function(res) {
          return res.data;
        })
      },
      updateDomain: function(updatedata) {
        return $http({
          method: "PATCH",
          url: "/domain/updateData",
          data: updatedata,
          'content-type': "application/json"
        }).then(function(res) {
            return res;
          },
          function() {
            return "Unable to Update Domain";
          })
      },
      postNewDomain: function(postdata) {
        return $http({
          method: "POST",
          url: "/domain/addData",
          data: postdata,
          'content-type': "application/json"
        }).then(function(res) {
          return res;
        }, function(err) {
          return err;
        });
      }
    }
  });
