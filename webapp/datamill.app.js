angular.module('datamill', ['ngMaterial',
  'ngMessages',
  'ui.router',
  'mdPickers',
  'ngAvatar',
  'satellizer'
])

.controller('datamillCtrl', ['$scope', '$state', '$auth', '$rootScope', 'profileservice',
  function($scope, $state, $auth, $rootScope, profileservice) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(res) {
          console.log(res);
          $state.go('datamill.dashboard');
        });
    };
    $scope.logout = function() {
      $auth.logout();
      $state.go('datamill');
    }
    console.log($scope.isAuthenticated());
    if ($scope.isAuthenticated()) {
      //$state.go('datamill.dashboard');
      $state.go('datamill');
    } else {
      $state.go('datamill');
    }
    profileservice.getProfile().then(function(res) {
      $scope.user = res;
    })
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
      console.log("inside state change");
      if (toState.name == 'datamill') {
        return;
      }
      if (!$scope.isAuthenticated()) {
        event.preventDefault(); // stop current execution
        $state.go('datamill');
        return;
      }
    });
  }
]);
