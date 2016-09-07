angular.module('datamill')
  .controller('dashboardCtrl', ['$scope', '$http', '$log', 'listDataModelsService', function($scope, $http, $log, listDataModelsService) {
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
