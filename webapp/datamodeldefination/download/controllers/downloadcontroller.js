angular.module('datamill')
  .controller('downloadCtrl', ['$scope', '$log', '$mdDialog', 'options',
    function($scope, $log, $mdDialog, options) {
      $scope.download = options;
      // return back the saved results
      $scope.saveOption = function(answer) {
        $log.info(answer);
        $mdDialog.hide(answer);
      };
      // cancelling the dialog
      $scope.cancelOption = function() {
        $mdDialog.cancel();
      }
    }
  ]);
