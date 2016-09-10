angular
  .module('datamill')
  .controller('createdatasourceController', populate);

function populate($stateParams, postdataService, $state, $mdDialog, $location, $anchorScroll) {
  var ctrl = this;
  ctrl.user = {}
  ctrl.user.tags = [];
  ctrl.user = $stateParams.user;

  ctrl.add = function() {
    $location.hash('errorid');
    $anchorScroll.yOffset = 1000;
    $anchorScroll();
    if (ctrl.user.tags.length == 0) {
      ctrl.showerror = true;
    }
    if (ctrl.user.name != null && ctrl.user.tags.length != 0 && ctrl.user.description != null) {
      postdataService.postdatasources(ctrl.user).then(function() {
        $state.go('datamill.datasource');
      }, function() {
        $state.go('datamill.datasource');
      });
    }
  }

}
