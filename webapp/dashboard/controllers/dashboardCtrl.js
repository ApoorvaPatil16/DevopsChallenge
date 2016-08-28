angular.module('datamill')
  .controller('dashboardCtrl', ['$scope', '$http', '$log', '$filter', function($scope, $http, $log, $filter) {

    $http.get("http://localhost:7070/datamodel").then(function(res) {
        $scope.datamodel = res.data;
      }),


      $scope.searchbyFilter = function() {
        $scope.searchItems = ['name', 'delivery', 'state'];
        temp = $scope.searchItems;
      },

      /*  Object.defineProperty($scope, "searchFilter", {
    get: function() {
      var out = {};
      out[$scope.searchby || "$"] = $scope.search;
      return out;
    }
  })
*/
      $scope.getSearchResults = function() {
        $log.log("In simple search");
        $http.get("http://localhost:7070/datamodel/?q=" + $scope.search).then(function(searchResponse) {
          $scope.datamodel = searchResponse.data;
          $log.log($scope.datamodel);
        })
      },


      $scope.getSearchByFilter = function() {
        {
          $http.get("http://localhost:7070/datamodel/?" + $scope.searchby + "_like=" + $scope.search).then(function(searchResp) {
            $scope.datamodel = searchResp.data;
          })
        }

      }
  }])
