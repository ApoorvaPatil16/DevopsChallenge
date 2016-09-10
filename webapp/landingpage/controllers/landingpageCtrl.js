angular.module('datamill')
  .controller('landingpageCtrl', ['$scope', '$log', '$auth', '$http', function($scope, $log, $auth, $http) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(res) {
          console.log(res);
        });
    };
  }])
