angular
  .module('datamill')
  .controller('createdatasourceController', populate);

function populate($stateParams, postdataService, $state, $mdDialog) {
  var ctrl = this;
  ctrl.user = {}
  ctrl.user.tags = [];
  ctrl.user = $stateParams.user;

  ctrl.add = function() {
    if (ctrl.user.name != null && ctrl.user.tags.length != 0 && ctrl.user.description != null) {
      postdataService.postdatasources(ctrl.user).then(function() {
        $state.go('datamill.datasource');
      }, function() {
        $state.go('datamill.datasource');
      });
    }
  }

}
