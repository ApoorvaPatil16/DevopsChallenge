angular.module('datamill')
  .component('datamillModel', {
    bindings: {
      formTitle: "@?",
      modelName: "<",
      attrs: "<",
      onUpdate: '&',
      fileSrcInclude: "@?"
    },
    templateUrl: '/datamodeldefination/templates/datamillModel.html',
    controller: datamillModelController,
    transclude: true
  });

function datamillModelController($scope, datamodeldefinationservice, $element, $transclude, $log) {
  var ctrl = this;
  $scope.iseditable = -1;
  datamodeldefinationservice.getDomain().then(function(res) {    ctrl.domain = res;    }, function(res) { $log.info("failed to get"); });
  datamodeldefinationservice.getAttrType().then(function(res) {    ctrl.attrtype = res;    }, function(res) { $log.info("failed to get"); });
  $scope.add = function() {
      ctrl.attrs.push({});
    }
    /*it will remove the one form */
  ctrl.remove = function(index) {
      ctrl.attrs.splice(index, 1);
    }
    /*it will save and update on parent the one form */
  ctrl.save = function(index, attribute) {
      console.log($scope.attrs);
      angular.copy(attribute, ctrl.attrs[index]);
      ctrl.iseditable = -1;
    }
    /*it will cancel editing on parent the one form */
  ctrl.cancel = function(index) {
      ctrl.iseditable = -1;
    }
    /*it will enable editing on parent the one form */
  ctrl.edit = function(index) {
    ctrl.iseditable = index;
  }
  ctrl.isopen = false;
  $log.info(ctrl.formTitle)

}
