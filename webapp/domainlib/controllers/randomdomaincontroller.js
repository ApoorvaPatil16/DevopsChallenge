angular.module('datamill')
  .controller('randomDomainCtrl', ['$state', '$stateParams', '$scope', '$mdDialog', '$log', 'listDomainFactory', 'randomDomainFactory', function($state, $stateParams, $scope, $mdDialog, $log, listDomainFactory, randomDomainFactory) {
    $scope.randomDomain = {
      'name': ""
    };
    $scope.randomDomain.range = [];
    $scope.base = "";
    randomDomainFactory.getRandomDomainItems().then(function(res) {
      $scope.inputLabelsForDomain = res[0].inputLabelsForDomain;
      $scope.types = res[0].basetypes;
    });
    $scope.status = '  ';
    $scope.showAdvanced = function(ev) {
      $mdDialog.show({
          controller: panelDialogCtrl,
          templateUrl: '/domainlib/templates/patterndialog.html',
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
    $scope.mode = $stateParams.mode;
    $scope.createRandomDomain = function() {
      if ($scope.mode == "create") {
        if ($scope.randomDomain.base) {
          $scope.randomDomain.type = "Random Generated Domain";
          if ($scope.randomDomain.base == "String") {
            $scope.randomDomain.range[0].rangeOf = "words";
            $scope.randomDomain.range[0].rangeOf = "length";
          } else {
            $scope.randomDomain.range[0].rangeOf = "value";
          }
          var range = {};
          angular.copy($scope.randomDomain.range, range);
          $scope.randomDomain.range = [];
          Object.keys(range).forEach(function(k) {
            $scope.randomDomain.range.push(range[k]);
          });
          randomDomainFactory.postNewDomain($scope.randomDomain).then(function(res) {
            $log.info(res);
            var alert = $mdDialog.alert({
              title: 'Success',
              textContent: "Successfully created random domain: " + res.data.name,
              ok: 'Close'
            });
            $mdDialog.show(alert);
            $state.go('datamill.listdomain');
            $scope.randomDomain = {};
          }, function(err) {
            $log.info("fail");
            var alert = $mdDialog.alert({
              title: 'Fail',
              textContent: "Unable to create domain",
              ok: 'Close'
            });
            $mdDialog.show(alert);
          });
        } else {
          $scope.errForType = "Please Select Base Type";
        }

      } else {
        console.log($scope.randomDomain);
        randomDomainFactory.updateDomain($scope.randomDomain).then(function(res) {
            $log.info(res);
            var alert = $mdDialog.alert({
              title: 'Success',
              textContent: "Successfully updated random domain: " + res.data.name,
              ok: 'Close'
            });
            $mdDialog.show(alert);
            $state.go('datamill.listdomain');
            $scope.randomDomain = {};
          },
          function(err) {
            $log.info("fail");
            var alert = $mdDialog.alert({
              title: 'Fail',
              textContent: "Unable to update domain",
              ok: 'Close'
            });
            $mdDialog.show(alert);

          })
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
