angular.module('datamill')
  .controller('listdomainCtrl', ['$scope', 'listDomainFactory', function($scope, listDomainFactory) {
    $scope.count = 0;
    $scope.searchAllDomain = function() {
      listDomainFactory.getDomainItems($scope.count).then(function(res) {
        console.log($scope.count);
        $scope.domainItems = res;
        $scope.length = res.length;
      });
    }
    $scope.searchAllDomain();
    $scope.searchDomainFunction = function() {}
    $scope.searchNextFunction = function() {

      $scope.count = $scope.count + 10;
      $scope.searchAllDomain();

    }
    $scope.searchPreviousFunction = function() {
      $scope.count = $scope.count - 10;
      $scope.searchAllDomain();
    }
  }]);
