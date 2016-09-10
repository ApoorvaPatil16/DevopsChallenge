angular.module('datamill')
  .controller('listdomainCtrl', ['$scope', '$mdBottomSheet', 'listDomainFactory', function($scope, $mdBottomSheet, listDomainFactory) {
    $scope.count = 0;
    $scope.status = false;
    $scope.searchAllDomain = function() {
      $scope.searchDomain = "";
      $scope.closeStyle = {
        'background': 'none'
      }
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
    $scope.searchInputFunction = function() {
      $scope.searchDomain = "";
      $scope.closeStyle = {
        'background': 'rgb(221,240,221)'
      }
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
        templateUrl: '/domainlib/templates/domainbottomlist.html',
        controller: 'domainListBottomSheetCtrl'
      })
    };
  }])
  .controller('domainListBottomSheetCtrl', function($scope, $mdBottomSheet) {
    $scope.items = [
      { name: 'Random Domain', icon: 'class', 'state': 'datamill.randomDomain' },
      { name: 'Real Domain', icon: 'description', 'state': 'datamill.realDomain' }
    ];
    $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
  });
