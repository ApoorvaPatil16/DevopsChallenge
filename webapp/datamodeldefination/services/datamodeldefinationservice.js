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
        }, function(res) {
          return "Unable to connect server";
        })
      },
      // getting all the config from the server
      getDataModelConfig: function() {
        return $http.get("datamodel/conf").then(function(res) {
          return res.data;
        }, function(res) {
          return "Unable to connect server";
        })
      },
      //get the main structure of the datamodel
      getStructure: function(name) {
        return $http({
          method: "GET",
          url: '/datamodel/structure/' + name
        }).then(function(res) {
          return res.data;
        }, function(res) {
          return "unable to get the data";
        })
      },
      // posting the datamodeldefination to server
      postDataModel: function(postdata) {
        return $http({
          method: "POST",
          url: "/datamodel",
          data: postdata,
          'content-type': "aplication/json"
        }).then(function(res) {
          return res.data;
        }, function() {
          return "unable to create datamodel";
        });
      },
      //request to update the data in database
      patchDataModel: function(patchData, datamodelname) {
        return $http({
          method: "PATCH",
          url: "/datamodel/update/" + datamodelname,
          data: patchData,
          'content-type': 'aplication/json'
        }).then(function(res) {
            console.log(res);
            return res.data;
          },
          function(res) {
            return "Unable to update datamodel";
          })
      }
    }
  });
