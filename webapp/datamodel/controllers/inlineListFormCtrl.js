angular.module('datamill')
  .component('inlineListForm', {
    bindings: {
      formTitle: "@?",
      attrs: "<",
      onUpdate: '&',
      fileSrcInclude: "@?"
    },
    templateUrl: '/datamodel/templates/inlineListform.html',
    controller: inlineListFormController,
    transclude: true
  });

function inlineListFormController($scope, datamodelservice, $element, $transclude, $log) {
  var ctrl = this;
  $scope.iseditable = -1;
  datamodelservice.getDomain().then(function(res) {    ctrl.domain = res;    }, function(res) { $log.info("failed to get"); });
  datamodelservice.getAttrType().then(function(res) {    ctrl.attrtype = res;    }, function(res) { $log.info("failed to get"); });
  $scope.add = function() {
      ctrl.attrs.push({});
    }
    /*it will remove the one form */
  this.remove = function(index) {
      ctrl.attrs.splice(index, 1);
    }
    /*it will save and update on parent the one form */
  this.save = function(index, attribute) {
      console.log($scope.attrs);
      angular.copy(attribute, ctrl.attrs[index]);
      $scope.iseditable = -1;
    }
    /*it will cancel editing on parent the one form */
  this.cancel = function(index) {
      $scope.iseditable = -1;
    }
    /*it will enable editing on parent the one form */
  this.edit = function(index) {
    $scope.iseditable = index;
  }
  this.isopen = false;
  $log.info(this.formTitle)
}
