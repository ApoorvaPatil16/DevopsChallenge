angular.module('datamill')
  .factory('randomDomainFactory', function($http) {
    return {
      getRandomDomainItems: function() {
        return $http.get("/domain/primitive").then(function(res) {
          console.log('Here is Primitive', res);
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
          url: "/domain",
          data: postdata,
          'content-type': "application/json"
        }).then(function(res) {
          console.log(res);
          return res;
        }, function(err) {
          return err;
        });
      }
    }
  });
