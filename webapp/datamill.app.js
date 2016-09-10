angular.module('datamill', ['ngMaterial',
    'ngMessages',
    'ui.router',
    'mdPickers',
    'ngAvatar',
    'satellizer'
  ])
  .controller('datamillCtrl', ['$scope', '$state', '$auth',
    function($scope, $state, $auth) {
      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };
      $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
          .then(function(res) {
            console.log(res);
          });
      };
      console.log($scope.isAuthenticated());
      if ($scope.isAuthenticated()) {
        $state.go('datamill.dashboard');
      } else {
        $state.go('datamill');
      }
    }
  ]);
