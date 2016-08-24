angular.module('datamill')
  .controller('appBarCtrl', ['$scope', '$mdSidenav', '$mdPanel', 'authFactory',
    function($scope, $mdSidenav, $mdPanel, authFactory) {
      $this = this;
      // Fetch data from json server with call to factory service which in turn makes a http request
      authFactory.getNavbarItems().then(function(res) {
        $scope.appName = res[0].appName[0].name;
        $scope.sideNavItems = res[0].sideNavItems;
        $scope.accountItems = res[0].accountItems;
        $scope.materialIcons = res[0].materialIcons;
        $scope.sideNavBottomItems = res[0].sideNavBottomItems;
      });

      $scope.toggleLeft = buildToggler;

      function buildToggler(navID) {
        $mdSidenav(navID).toggle().then(function() {});
      }
      $scope.showNotification = function() {
        var position = $mdPanel.newPanelPosition()
          .absolute()
          .right()
          .top("60px");

        var config = {
          animation: undefined,
          attachTo: angular.element(document.body),
          controller: notificationDialogCtrl,
          controllerAs: 'notifyCtrl',
          templateUrl: '/notifications/templates/notifications.html',
          panelClass: 'notifications-content',
          position: position,
          trapFocus: true,
          zIndex: 150,
          clickOutsideToClose: true,
          clickEscapeToClose: true,
        };

        $mdPanel.open(config);
      }
    }
  ]);
