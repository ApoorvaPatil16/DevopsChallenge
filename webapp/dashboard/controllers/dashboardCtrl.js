angular.module('datamill')
  .controller('dashboardCtrl', ['$scope', '$http', '$log', '$filter', 'listDataModelsService', function($scope, $http, $log, $filter, listDataModelsService) {
    listDataModelsService.getDatamodelsList().then(function(res) {
      console.log(res);
      $scope.datamodel = res;
    });
    console.log($scope.datamodel);
    $scope.getSearchResults = function() {
      $log.log("In simple search");
      listDataModelsService.getDatamodelSearch($scope.search).then(function(res) {
        $scope.datamodel = res;
      });
      $log.log($scope.datamodel);
    }
  }])
