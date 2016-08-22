angular.module('datamill')
  .controller('dashboardCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get("http://localhost:7070/datamodel").then(function(res) {
        $scope.datamodel = res.data;
      }),
      $http.get("http://localhost:7070/datamodel").then(function(response) {
        $scope.deliverytype = response.data;
      });
  }])
