angular.module('datamill')
  .controller('listdomainCtrl', ['$scope', '$mdBottomSheet', 'listDomainFactory', function($scope, $mdBottomSheet, listDomainFactory) {
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

      $scope.count = $scope.count + 20;
      $scope.searchAllDomain();

    }
    $scope.searchPreviousFunction = function() {
      $scope.count = $scope.count - 20;
      $scope.searchAllDomain();
    }
    $scope.domainUpdateFunction = function() {}
    $scope.showListBottomSheet = function() {
      $mdBottomSheet.show({
        templateUrl: '/listdomain/templates/domainbottomlist.html',
        controller: 'domainListBottomSheetCtrl'
      })
    };
  }])
  .controller('domainListBottomSheetCtrl', function($scope, $mdBottomSheet) {
    $scope.items = [
      { name: 'Random Domain', icon: 'class' },
      { name: 'Real Domain', icon: 'description' }
    ];
    $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
  });
