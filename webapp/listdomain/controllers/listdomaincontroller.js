angular.module('datamill')
  .controller('listdomainCtrl', ['$scope', 'listDomainFactory', function($scope, listDomainFactory) {
    $scope.count = 0;
    $scope.searchAllDomain = function() {
      listDomainFactory.getDomainItems($scope.count).then(function(res) {
        $scope.domainItems = res;
        $scope.length = res.length;
      });
    }
    $scope.searchAllDomain();
    $scope.searchDomainFunction = function() {
      listDomainFactory.getDomainItems().then(function(res) {
        $scope.domainItems = res;
        $scope.length = res.length;
      });
    }
    $scope.searchNextFunction = function() {
      if ($scope.length == 0) {
        $scope.errorMessage = "No more records available";
      } else {
        $scope.count = $scope.count + 5;
        $scope.searchAllDomain();
      }

    }
    $scope.searchPreviousFunction = function() {
      if ($scope.count == 0) {
        $scope.errorMessage = "No more previous records available";
      } else {
        $scope.count = $scope.count - 5;
        $scope.searchAllDomain();
      }
    }
  }]);
