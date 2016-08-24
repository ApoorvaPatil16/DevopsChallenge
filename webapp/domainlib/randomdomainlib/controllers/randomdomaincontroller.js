angular.module('datamill')
  .controller('randomDomainCtrl', ['$scope', '$mdDialog', '$log', 'authFactory', function($scope, $mdDialog, $log, authFactory) {
    $scope.abc = "Vishal";
    $scope.dataRealRandom = {
      'type': "",
    }
    $scope.baseType = "";
    $scope.inputLabelsForDomain = {
      domainName: "Domain Name",
      domainType: "Base Type",
      domainRange: "Range",
      pattern: 'Format/Pattern'
    };
    $scope.types = [
      'String', 'Number', 'Boolean', 'Date', 'Time', 'Decimal', 'Hexadecimal'
    ];
    $scope.status = '  ';
    $scope.showAdvanced = function(ev) {
      $mdDialog.show({
          controller: panelDialogCtrl,
          templateUrl: '/domainlib/randomdomainlib/templates/patterndialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen
        })
        .then(function(answer) {
          $scope.status = answer;
        }, function() {
          $log.info('You cancelled the dialog.');
        });


    };
    $scope.createRandomDomain = function() {
      $log.info("a");
      authFactory.postNewDomain($scope.randomDomain).then(function(id) {
        $log.info("success");
        var alert = $mdDialog.alert({
          title: 'Success',
          textContent: "Successfully created random domain with id: " + id,
          ok: 'Close'
        });
        $mdDialog.show(alert);
      }, function(res) {
        $log.info("fail");
        var alert = $mdDialog.alert({
          title: 'Fail',
          textContent: "Unable to create domain",
          ok: 'Close'
        });
        $mdDialog.show(alert);
      });
    };
  }]);


function panelDialogCtrl($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
