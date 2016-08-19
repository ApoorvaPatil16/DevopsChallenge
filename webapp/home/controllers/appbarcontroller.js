angular.module('datamill')
  .controller('appBarController', ['$scope', '$mdSidenav', '$mdPanel','dataservice',
    function($scope, $mdSidenav, $mdPanel,dataservice) {
      $this = this;
      // Fetch data from json server with call to factory service which in turn makes a http request
      dataservice.getAppName().then(function(res){
        $scope.appName=res;
      });
      dataservice.getSideNavItems().then(function(res){
        $scope.sideNavItems=res;
      });
      dataservice.getAccountItems().then(function(res){
        $scope.accountItems=res;
      });

      $scope.toggleLeft = buildToggler;

      function buildToggler(navID) {
        $mdSidenav(navID).toggle().then(function() {});
      }

      $scope.showDialog = function() {
        var position = $mdPanel.newPanelPosition()
          .absolute()
          .right()
          .top("60px"); 

        var config = {
          animation: undefined,
          attachTo: angular.element(document.body),
          controller: notificationDialogController,
          controllerAs: 'notifyController',
          templateUrl: '/notifications/templates/notifications.html',
          panelClass: 'notifications-content',
          position: position,
          trapFocus: true,
          zIndex: 150,
          clickOutsideToClose: true,
          clickEscapeToClose: true,
        };

        $mdPanel.open(config);
      };

      
    }
  ]);
