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
  var ctrl = this
  datamodeldefinationservice.getDomain().then(function(res) {    ctrl.domain = res;    }, function(res) { $log.info("failed to get"); });
  datamodeldefinationservice.getAttrType().then(function(res) {    ctrl.attrtype = res;    }, function(res) { $log.info("failed to get"); });
  ctrl.add = function() {
      ctrl.attrs.push({});
    }
    /*it will remove the one attribute from datamilldomain */
  ctrl.remove = function(index) {
    ctrl.attrs.splice(index, 1);
  }
  $log.info(ctrl.formTitle)

}
