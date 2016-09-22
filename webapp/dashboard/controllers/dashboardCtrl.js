angular.module('datamill')
  .controller('dashboardCtrl', ['$mdDialog', '$scope', '$http', '$log', 'listDataModelsService', function($mdDialog, $scope, $http, $log, listDataModelsService) {
    var socket = io();
    listDataModelsService.getDatamodelsList().then(function(res) {
      console.log(res);
      $scope.datamodel = res;
      $scope.datamodel.forEach(function(obj, i) {
        var emitEventName = "listener::" + obj.name;
        var onEventName = "receiver::" + obj.name;
        socket.emit(emitEventName, obj);
        socket.on(onEventName, function(incomingData) {
          $scope.datamodel[i].incomingdata;
        });
      })
    });
    console.log($scope.datamodel);
    $scope.searchAll = function() {
      $scope.count = 0;
      $scope.status = true;
      listDataModelsService.getDatamodelsList().then(function(res) {
        $scope.datamodel = res;
        $scope.datamodel.forEach(function(obj, i) {
          var emitEventName = "listener::" + obj.name;
          var onEventName = "receiver::" + obj.name;
          socket.emit(emitEventName, obj);
          socket.on(onEventName, function(incomingData) {
            $scope.datamodel[i].incomingdata;
          });
        })
      })
    }

    $scope.searchDataFunction = function() {
      $scope.count = 0;
      $scope.status = true;
      listDataModelsService.getDatamodelSearch($scope.searchData).then(function(res) {
        $scope.datamodel = res;
      })
    }
    $scope.searchInputFunction = function() {
      $scope.searchData = "";
      $scope.closeStyle = {
        'background': 'rgb(221,240,221)'
      }
    }
    $scope.showDownload = function(ev, datamodel) {
      console.log(datamodel);
      $mdDialog.show({
          controller: downloadDialogCtrl,
          templateUrl: '/dashboard/templates/downloaddialog.html',
          locals: {
            datamodel: datamodel
          },
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: false,
          fullscreen: $scope.customFullscreen
        })
        .then(function(answer) {
          $scope.status = answer;
        }, function() {
          $log.info('You cancelled the dialog.');
        });
    };
  }])

function downloadDialogCtrl($scope, $mdDialog, datamodel, datamodeldefinationservice) {
  $scope.card = {};
  $scope.card = datamodel;

  datamodeldefinationservice.getStructure(datamodel.name).then(function(res) {
    console.log("Here we geting getStructure", res);
    if (res && res.attributes[0]) $scope.card.attributes = res.attributes;
    else $scope.card.attributes = [];
    console.log("we are with data model:", $scope.card)
    socket = io();
    socket.emit('download', $scope.card);
    var onEventName = "download_" + $scope.card.email + "_" + $scope.card.name;
    socket.on(onEventName, function(data) {
      $scope.data = $scope.data + data;
    })
  })
  console.log($scope.card);
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
