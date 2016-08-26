angular.module('datamill')
  .controller('dashboardCtrl', ['$scope', '$http', '$log', '$filter', function($scope, $http, $log, $filter) {
    $http.get("http://localhost:7070/datamodel").then(function(res) {
        $scope.datamodel = res.data;
      }),
      $http.get("http://localhost:7070/datamodel").then(function(response) {
        $scope.deliverytype = response.data;
      }),
      $scope.isOpen = false,
      $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
      },
      $scope.searchbyFilter = function() {
        $scope.searchItems = ['name', 'deliverytype', 'state'];
      },
      Object.defineProperty($scope, "searchFilter", {
        get: function() {
          var out = {};
          out[$scope.searchby || "$"] = $scope.search;
          return out;
        }
      })
      // $scope.searchby = "$";
      // // $scope.search = {
      // //   "name": "",
      // //   "Export Type": "",
      // //   "State": ""
      // // }



  }])
