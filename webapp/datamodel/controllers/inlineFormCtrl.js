angular.module('datamill')
  .component('inlineForm', {
    bindings: {
      formTitle: "@?",
      attrs: "<",
      onUpdate: '&',
      fileSrcInclude: "@?"
    },
    templateUrl: '/datamodel/templates/inlineform.html',
    controller: inlineFormController,
    transclude: false
  });

function inlineFormController($scope, datamodelservice) {
  var ctrl = this;
  $scope.iseditable = -1;
  datamodelservice.getDomain().then(function(res) {    ctrl.domain = res;    });
  datamodelservice.getAttrType().then(function(res) {    ctrl.attrtype = res;    });
  $scope.add = function() {
    ctrl.attrs.push({});
  }
  this.remove = function(index) {
    ctrl.attrs.splice(index, 1);
    //this.onUpdate({ attr: $scope.attrs });
  }
  this.save = function(index, attribute) {
    console.log($scope.attrs);
    angular.copy(attribute, ctrl.attrs[index]);
    $scope.iseditable = -1;
  }
  this.cancel = function(index) {
    $scope.iseditable = -1;
  }
  this.edit = function(index) {
    $scope.iseditable = index;
  }
  this.isopen = false;
  console.log(this.formTitle)
}
