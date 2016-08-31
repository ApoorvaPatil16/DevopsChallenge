angular.module('datamill')
  .factory('datamodeldefinationservice', function($http) {
    return {
      getDomain: function() {
        return $http.get("api/domain").then(function(res) {            
          return res.data;        
        }, function(res) {
          return "Unable to connect server";
        })
      },
      getAttrType: function() {
        return $http.get("api/attrtype").then(function(res) {            
          return res.data;        
        })
      },
      getDataModelConfig: function() {
        return $http.get("api/datamodelconf").then(function(res) {
          return res.data;
        }, function() {
          return "Unable to connect server";
        })
      },
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
