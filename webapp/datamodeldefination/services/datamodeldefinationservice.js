angular.module('datamill')
  .factory('datamodeldefinationservice', function($http, $q) {
    return {
      // getting domain from the server
      getDomain: function() {
        return $q(function(resolve, reject) {
          $http.get("api/domain").then(function(res) {            
            resolve(res.data);        
          }, function(res) {
            reject("Unable to connect server");
          })
        })
      },
      // getting attribute types from server
      getAttrType: function() {
        return $q(function(resolve, reject) {
          $http.get("api/attrtype").then(function(res) {            
            resolve(res.data);        
          }, function(res) {
            reject("Unable to connect server");
          })
        })
      },
      // getting all the config from the server
      getDataModelConfig: function() {
        return $q(function(resolve, reject) {
          $http.get("datamodel/conf").then(function(res) {
            resolve(res.data);
          }, function(res) {
            reject("Unable to connect server");
          })
        })
      },
      //get the main structure of the datamodel
      getStructure: function(name) {
        return $q(function(resolve, reject) {
          $http({
            method: "GET",
            url: '/datamodel/structure/' + name
          }).then(function(res) {
            resolve(res.data);
          }, function(res) {
            reject("unable to get the data");
          })
        })
      },
      //get fulldatamodel
      getFullDatamodel: function(damodelname) {
        return $q(function(resolve, reject) {
          $http({
            method: "GET",
            url: '/datamodel/fulldatamodel/' + damodelname
          }).then(function(res) {
            resolve(res.data);
          }, function(res) {
            reject("unable to get the data");
          })
        })
      },
      // posting the datamodeldefination to server
      postDataModel: function(postdata) {
        return $q(function(resolve, reject) {
          $http({
            method: "POST",
            url: "/datamodel",
            data: postdata,
            'content-type': "aplication/json"
          }).then(function(res) {
            resolve(res.data);
          }, function() {
            reject("unable to create datamodel");
          });
        })
      },
      //request to update the data in database
      patchDataModel: function(patchData, datamodelname) {
        return $q(function(resolve, reject) {
          $http({
            method: "PATCH",
            url: "/datamodel/update/" + datamodelname,
            data: patchData,
            'content-type': 'aplication/json'
          }).then(function(res) {
              console.log(res);
              resolve(res.data);
            },
            function(res) {
              reject("Unable to update datamodel");
            })
        })
      }
    }
  });
