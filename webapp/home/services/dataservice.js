angular.module('datamill')
  .factory('dataservice', function($http) {
    return {
      getAppName: function() {
        return $http.get("http://localhost:7070/appName").then(function(res) {
          //console.log(res);
          return res.data[0].name;
        })
      },
      getSideNavItems: function() {
        return $http.get("http://localhost:7070/sideNavItems").then(function(res) {
          return res.data;
        })
      },
      getAccountItems: function() {
        return $http.get("http://localhost:7070/accountItems").then(function(res) {
          return res.data;
        })
      }
    }
  });
