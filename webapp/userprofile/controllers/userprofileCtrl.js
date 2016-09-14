angular.module('datamill')
  .controller('userprofileCtrl', ['$http', '$scope', function($http,$scope) {
    
     
        $http.get("/profile").then(function(res) {
          $scope.data= res.data;
        })
     
  	
}]);