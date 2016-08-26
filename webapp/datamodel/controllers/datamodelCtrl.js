angular.module('datamill')
  .controller('datamodelController', ['$scope', 'datamodelservice', '$state', '$mdDialog', '$log', function($scope, datamodelservice, $state, $mdDialog, $log) {
    $scope.dataModel = {
      "name": '',
      "description": '',
      "attributes": [],
      "patterns": []
    };
    /*Getting Data Model Input config*/
    datamodelservice.getDataModelConfig().then(function(res) {    $scope.datamodelconf = res;    });
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
          controllerAs: 'ctrl',
          controller: datafeedCtrl,
          contentElement: '#deliveryOption',
          parent: angular.element(document.body),
          //targetEvent: ev,
          //resolve: $state.go(state),
          clickOutsideToClose: true,
          fullscreen: true
        }).then(function(answer) {
          $log.info(answer);
          $scope.dataModel.feedOption = answer;
          $state.go('^');
        }, function() { $state.go('^'); });
      });
      $log.info($state.current.name);
      // if ($state.current.name === state) {
      //   $mdDialog.show({
      //     //controller: DialogController,
      //     contentElement: '#deliveryOption',
      //     parent: angular.element(document.body),
      //     targetEvent: ev,
      //     clickOutsideToClose: true,
      //     fullscreen: true
      //   });
      // }

    };
    // for posting the data to the server
    $scope.createDataModel = function() {
      datamodelservice.postDataModel($scope.dataModel).then(function(id) {
          $log.info("submited successfully " + id);
        },
        function(res) {
          $log.info(res)
        })
    }
  }]);
