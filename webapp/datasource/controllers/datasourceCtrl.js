angular
  .module('datamill')
  .controller('datasourceController', function($scope, listdataService, $state, $mdDialog) {
    listdataService.getdatasources().then(function(res) {
      $scope.nameofsource = res;
    });
    $scope.abc = function() {}
  });
