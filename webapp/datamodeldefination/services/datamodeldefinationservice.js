angular.module('datamill')
  .factory('datamodeldefinationservice', function($http) {
    return {
      getDomain: function() {
        return $http.get("http://localhost:7070/domain").then(function(res) {            
          return res.data;        
        }, function(res) {
          return "Unable to connect server";
        })
      },
      getAttrType: function() {
        return $http.get("http://localhost:7070/attrtype").then(function(res) {            
          return res.data;        
        })
      },
      getDataModelConfig: function() {
        return $http.get("http://localhost:7070/datamodelconf").then(function(res) {
          return res.data;
        }, function() {
          return "Unable to connect server";
        })
      },
      postDataModel: function(postdata) {
        return $http({
          method: "POST",
          url: "http://localhost:7070/datamodel",
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
