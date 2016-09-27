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
    $scope.showFeed = function(ev, datamodel) {
      $mdDialog.show({
          controller: feedDialogCtrl,
          templateUrl: '/dashboard/templates/feeddialog.html',
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

function downloadDialogCtrl($scope, $mdDialog, datamodel, datamodeldefinationservice, $filter) {
  $scope.datamodeldialog = angular.copy(datamodel);
  $scope.data = []
  $scope.copydis = true;
  var editor = undefined;
  datamodeldefinationservice.getFullDatamodel(datamodel.name).then(function(res) {
    console.log("Here we geting getStructure", res);
    if (res && res.attributes[0]) $scope.datamodeldialog.attributes = res.attributes;
    else $scope.datamodeldialog.attributes = [];
    console.log("we are with data model:", $scope.datamodeldialog)
    socket = io();
    socket.emit('download', JSON.stringify($scope.datamodeldialog));
    var onEventName = "download_" + $scope.datamodeldialog.email + "_" + $scope.datamodeldialog.name;
    console.log('listener name is :', onEventName);
    editor = ace.edit("downloadeditor");
    editor.setTheme("ace/theme/twilight");
    var JavaScriptMode = ace.require("ace/mode/json").Mode;
    editor.session.setMode(new JavaScriptMode())
      //editor.setReadOnly(true);
    editor.renderer.setShowGutter(false);
    socket.on(onEventName, function(data) {
      //console.log(data)
      if (data == null) {
        $scope.copydis = false;
        $scope.$apply();
        console.log(data);
        editor.setValue($filter('json')($scope.data, 2));
        $scope.downloadFunc();
      } else {
        $scope.data.push(data);
        //editor.setValue(JSON.stringify($scope.data));
        $scope.$apply();
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
  $scope.downloadFunc = function() {
    var text = editor.getValue();
    if (!text) {
      console.log("getting value from filter");
      text = $filter('json')($scope.data, 2);
    }
    var textFileAsBlob = new Blob([text], { type: 'text/plain' });
    var filename = "db.json";
    var downloadlink = document.createElement("a");
    downloadlink.download = filename;
    window.URL = window.URL || window.webkitURL;
    downloadlink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadlink.onclick = function(ev) {
      document.body.removeChild(ev.target);
    }
    document.body.appendChild(downloadlink);
    downloadlink.click();
  }
  $scope.answer = function(answer) {
    $scope.downloadFunc();
    $mdDialog.hide(answer);
  };
}

function feedDialogCtrl($scope, $mdDialog, datamodel, datamodeldefinationservice) {
  $scope.datamodeldialog = angular.copy(datamodel);
  $scope.data = [];
  $scope.count = 0;
  socket = io();
  datamodeldefinationservice.getFullDatamodel(datamodel.name).then(function(res) {
    console.log("Here we geting getStructure", res);
    if (res && res.attributes[0]) $scope.datamodeldialog.attributes = res.attributes;
    else $scope.datamodeldialog.attributes = [];
    console.log("we are with data model:", $scope.datamodeldialog);
    socket.emit('feed', JSON.stringify($scope.datamodeldialog));
    var onEventName = "feed_" + $scope.datamodeldialog.email + "_" + $scope.datamodeldialog.name;
    console.log('listener name is :', onEventName);
    socket.on(onEventName, function(data) {
      console.log("Packets:", data);
      $scope.data.push(data);
      if ($scope.data.length > 20) {
        $scope.data.shift();
      }
      $scope.datastr = "";
      $scope.data.forEach(function(k) {
        $scope.count = $scope.count + 1;
        $scope.datastr += JSON.stringify(k) + "\n";
      })
      $scope.$apply();
    })
  })
  $scope.hide = function() {
    socket.disconnect();
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    socket.disconnect();
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    socket.disconnect();
    $mdDialog.hide(answer);
  };
}
