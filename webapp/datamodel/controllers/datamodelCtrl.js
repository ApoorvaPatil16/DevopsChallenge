angular.module('datamill')
  .controller('datamodelController', ['$scope', 'datamodelservice', function($scope, datamodelservice) {
    $scope.dataModel = {
      "name": '',
      "description": '',
      "attributes": [],
      "patterns": []
    };
    //datamodelservice.getVisibility().then(function(res) {    $scope.radioData = res;    });
    //datamodelservice.getDeliveryType().then(function(res) {    $scope.deliveryType = res;    });
    datamodelservice.getDataModelConfig().then(function(res) {    $scope.datamodelconf = res;    });
    // $scope.radioData = [{ "label": "Public", "value": "public" }, { "label": "Private", "value": "private" }, { "label": "Share Only", "value": "shared" }]
    // $scope.deliveryType = [{ "label": "Download", "value": "download" }, { "label": "Feed", "value": "feed" }]
    $scope.addAttribute = function(attr) {
      console.log("me inside save main have data:" + attr);
      if (attr) {
        $scope.dataModel.attributes.push(attr);
      }
    }
  }]);
