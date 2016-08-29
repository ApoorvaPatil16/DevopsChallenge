angular.module('datamill')
  .controller('randomDomainCtrl', ['$stateParams', '$scope', '$mdDialog', '$log', 'listDomainFactory', 'randomDomainFactory', function($stateParams, $scope, $mdDialog, $log, listDomainFactory, randomDomainFactory) {
    $scope.dataRealRandom = {
      'type': "",
    }
    $scope.randomDomain = {};
    $scope.baseType = "";
    randomDomainFactory.getRandomDomainItems().then(function(res) {
      $scope.inputLabelsForDomain = res[0].inputLabelsForDomain;
      $scope.types = res[0].basetypes;
    });
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
    $scope.randomDomain = $stateParams.randomDomain;
    $scope.createRandomDomain = function() {
      console.log($scope.randomDomain);
      $scope.randomDomain.type = "Random Generated Domain";
      listDomainFactory.getDomainItemsByName($scope.randomDomain.name).then(function(res) {
        if (res.length != 0) {
          $scope.errorMessage = "Domain name " + $scope.randomDomain.name + " already exits."
        } else {
          randomDomainFactory.postNewDomain($scope.randomDomain).then(function(id) {
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
      });

    }

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
