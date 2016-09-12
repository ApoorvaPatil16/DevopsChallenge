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
  // getting the domain list from server
  datamodeldefinationservice.getDomain().then(function(res) {   
    ctrl.domain = res;
    ctrl.domainName = ctrl.domain.map(function(d) {
      return d.name;
    });   
  }, function(res) { $log.info("failed to get"); });
  //datamodeldefinationservice.getAttrType().then(function(res) {    ctrl.attrtype = res;    }, function(res) { $log.info("failed to get"); });
  ctrl.add = function() {
      if (ctrl.attrs.length) {
        //console.log(ctrl.attrs[ctrl.attrs.length - 1]['name'])
        if (ctrl.attrs[ctrl.attrs.length - 1]['name'] === "" || ctrl.attrs[ctrl.attrs.length - 1]['name'] === null || ctrl.attrs[ctrl.attrs.length - 1]['name'] == undefined) return;
        if (ctrl.attrs[ctrl.attrs.length - 1]['domain'] === "" || ctrl.attrs[ctrl.attrs.length - 1]['domain'] == null || ctrl.attrs[ctrl.attrs.length - 1]['domain'] == undefined) return;
      }
      ctrl.attrs.push({});
    }
    /*it will remove the one attribute from datamilldomain */
  ctrl.remove = function(index) {
      ctrl.attrs.splice(index, 1);
    }
    //md-autocomplete supporting function

  ctrl.querySearch = function querySearch(query) {
    var results = query ? ctrl.domain.filter(createFilterFor(query)) : ctrl.domainName;
    return results;
  };

  function createFilterFor(query) {
    return function filterFn(domain) {
      return (domain.toLowerCase().indexOf(query.toLowerCase()) === 0);
    };
  }
  $log.info(ctrl.formTitle);
  $log.info("datamillModelController registered");
}
