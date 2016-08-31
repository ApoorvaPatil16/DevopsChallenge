angular.module('datamill')
  .factory('datamodeldefinationservice', function($http) {
    return {
      // getting domain from the server
      getDomain: function() {
        return $http.get("api/domain").then(function(res) {            
          return res.data;        
        }, function(res) {
          return "Unable to connect server";
        })
      },
      // getting attribute types from server
      getAttrType: function() {
        return $http.get("api/attrtype").then(function(res) {            
          return res.data;        
        })
      },
      // getting all the config from the server
      getDataModelConfig: function() {
        return $http.get("api/datamodelconf").then(function(res) {
          return res.data;
        }, function() {
          return "Unable to connect server";
        })
      },
      // posting the datamodeldefination to server
      postDataModel: function(postdata) {
        return $http({
          method: "POST",
          url: "api/datamodel",
          data: postdata,
          'content-type': "aplication/json"
        }).then(function(res) {
          return res.data;
        }, function() {
          return "unable to create data";
        });
      }
    }
  });
