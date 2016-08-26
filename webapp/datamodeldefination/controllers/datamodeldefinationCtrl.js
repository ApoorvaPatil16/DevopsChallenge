angular.module('datamill')
  .controller('datamodeldefinationController', ['$scope', 'datamodeldefinationservice', '$state', '$mdDialog', '$log', function($scope, datamodeldefinationservice, $state, $mdDialog, $log) {
    $scope.dataModel = {
      "name": '',
      "description": '',
      "attributes": [],
      "patterns": []
    };
    /*Getting Data Model Input config*/
    datamodeldefinationservice.getDataModelConfig().then(function(res) {    $scope.datamodelconf = res;    });
    // Adding Attributes Variable for on Fly showing
    $scope.addAttribute = function(attr) {
      console.log("me inside save main have data:" + attr);
      if (attr) {
        $scope.dataModel.attributes.push(attr);
      }
    };
    // For Delivery option modal opening
    $scope.showDeliveryOption = function(ev, state) {
      $log.info(state);
      $state.go(state).then(function() {
        $mdDialog.show({
          contentElement: '#deliveryOption',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          fullscreen: true
        }).then(function(answer) {
          $log.info(answer);
          $scope.dataModel.feedOption = answer;
          $state.go('^');
        }, function() { $state.go('^'); });
      });
      $log.info($state.current.name);
    };
    // for posting the data to the server
    $scope.createDataModel = function() {
      datamodeldefinationservice.postDataModel($scope.dataModel).then(function(res) {
          $log.info("submited successfully " + res);
          showAlert(res.id);
        },
        function(res) {
          $log.info(res)
        })
    };
    $scope.cancelDataModel = function() {
      $state.go('datamill.dashboard');
    }

    function showAlert(id) {
      alert = $mdDialog.alert()
        .title('Attention, ' + $scope.userName)
        .textContent('Created Data Model with Id:' + id)
        .ok('Close');
      $mdDialog
        .show(alert)
        .finally(function() {
          $state.go('datamill.dashboard');
          alert = undefined;
        });
    }
  }]);
