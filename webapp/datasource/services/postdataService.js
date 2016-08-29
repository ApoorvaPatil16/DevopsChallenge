angular.module('datamill')
.factory('postdataService', function($http, $log) {
  return {
    postdatasources: function(data) {
      return $http({
        method: 'POST',
        data:data,
        'content-type':'application/json',
        url: 'http://localhost:7070/datasource'
      }).then(function successCallback(response) {  
        $log.info(response) ;
      }, function errorCallback(response) {
        $log.info(response) ;
      });
    }
  };
});
