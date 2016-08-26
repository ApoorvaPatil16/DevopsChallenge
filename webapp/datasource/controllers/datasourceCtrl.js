angular
.module('datamill')
.controller('datasourceController',function($scope,listdataService) {
	 listdataService.getdatasources().then(function(res) {
	 	$scope.nameofsource=res;
      });
});