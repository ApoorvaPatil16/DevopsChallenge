angular.module('datamill')
  .factory('datamodelservice', function($http) {
    return {
      getVisibility: function() {
        return $http.get("http://localhost:7070/visibility").then(function(res) {
          //console.log(res);
          return res.data;
        }, function(res) {})
      },
      getDeliveryType: function() {        
        return $http.get("http://localhost:7070/deleverytype").then(function(res) {            
          return res.data;        
        })    
      },
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
      }
    }
  });
