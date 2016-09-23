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
  $scope.datamodeldialog = angular.copy(datamodel);
  $scope.data = []
  $scope.copydis = true;
  datamodeldefinationservice.getFullDatamodel(datamodel.name).then(function(res) {
    console.log("Here we geting getStructure", res);
    if (res && res.attributes[0]) $scope.datamodeldialog.attributes = res.attributes;
    else $scope.datamodeldialog.attributes = [];
    console.log("we are with data model:", $scope.datamodeldialog)
    socket = io();
    socket.emit('download', JSON.stringify($scope.datamodeldialog));
    var onEventName = "download_" + $scope.datamodeldialog.email + "_" + $scope.datamodeldialog.name;
    console.log('listener name is :', onEventName);
    socket.on(onEventName, function(data) {
      console.log(data)
      if (data == null) {
        $scope.copydis = false;
        $scope.show();
      } else {
        $scope.data.push(data);
      }
    })
  })
  $scope.show = function() {
    console.log($scope.data);
  }
  console.log($scope.datamodeldialog);
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
