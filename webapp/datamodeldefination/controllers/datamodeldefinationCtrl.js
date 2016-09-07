angular.module('datamill')
  .controller('datamodeldefinationController', ['$scope', 'datamodeldefinationservice', '$state', '$stateParams', '$mdDialog', '$log', function($scope, datamodeldefinationservice, $state, $stateParams, $mdDialog, $log) {
    $scope.dataModel = $stateParams.dataModel;
    $scope.isedit = ($stateParams.mode === 'edit')
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
      // to show the deliveryOption
      if (!$scope.dataModel.deliveryOption) $scope.dataModel.deliveryOption = {};
      $mdDialog.show({
        controller: state + 'Ctrl',
        controllerAs: 'ctrl',
        templateUrl: '/datamodeldefination/' + state + '/templates/' + state + '.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: true,
        locals: { options: $scope.dataModel.deliveryOption[state] }
      }).then(function(answer) {
        $log.info(answer);
        $scope.dataModel.deliveryOption[state] = answer;
      }, function() {}).finally(function() {});
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
    // for canceling the data model
    $scope.cancelDataModel = function() {
        $state.go('datamill.dashboard');
      }
      // datamodel create success message show
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
    $log.info("datamodeldefinationController is registered");
  }]);
