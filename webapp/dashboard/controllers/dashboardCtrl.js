angular.module('datamill')
  .controller('dashboardCtrl', ['$scope', '$http', '$log', 'listDataModelsService', function($scope, $http, $log, listDataModelsService) {
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
  }])
