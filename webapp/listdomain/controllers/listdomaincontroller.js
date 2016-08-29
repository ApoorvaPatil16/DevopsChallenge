angular.module('datamill')
  .controller('listdomainCtrl', ['$scope', 'listDomainFactory', function($scope, listDomainFactory) {
    $scope.count = 0;
    $scope.status = false;
    $scope.searchAllDomain = function() {
      $scope.status = false;
      listDomainFactory.getDomainItems($scope.count).then(function(res) {
        $scope.domainItems = res;
        $scope.length = res.length;
      });
    }
    $scope.searchAllDomain();
    $scope.searchDomainFunction = function() {
      $scope.count = 0;
      $scope.status = true;
      listDomainFactory.getDomainItemsByName($scope.searchDomain).then(function(res) {
        $scope.domainItems = res;
        $scope.length = res.length;
      })
    }
    $scope.searchNextFunction = function() {

      $scope.count = $scope.count + 10;
      $scope.searchAllDomain();

    }
    $scope.searchPreviousFunction = function() {
      $scope.count = $scope.count - 10;
      $scope.searchAllDomain();
    }
    $scope.domainUpdateFunction = function() {}
  }]);
