angular.module('datamill')
  .config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
      return moment(date).format('YYYY-MM-DD');
    };
  })
  .controller('randomDomainCtrl', ['$state', '$stateParams', '$scope', '$mdDialog', '$log', 'listDomainFactory', 'randomDomainFactory', function($state, $stateParams, $scope, $mdDialog, $log, listDomainFactory, randomDomainFactory) {
    $scope.dataRealRandom = {
      'type': "",
    }
    $scope.randomDomain = {
      'name': "",
      'range': {},
      'isEditable': 'true'
    };
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
      console.log($scope.randomDomain.baseType);
      if ($scope.randomDomain.baseType) {
        $scope.randomDomain.type = "Random Generated Domain";
        listDomainFactory.getDomainItemsByName($scope.randomDomain.name).then(function(res) {
          if (res.length != 0 && $scope.randomDomain.isEditable) {
            $scope.errorMessage = "Domain name " + $scope.randomDomain.name + " already exists."
          } else {
            randomDomainFactory.postNewDomain($scope.randomDomain).then(function(id) {
              $log.info("success");
              var alert = $mdDialog.alert({
                title: 'Success',
                textContent: "Successfully created random domain with id: " + id,
                ok: 'Close'
              });
              $mdDialog.show(alert);
              $state.go('datamill.listdomain');
              $scope.randomDomain = {};
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
      } else {
        $scope.errForType = "Please Select Base Type";
      }
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
