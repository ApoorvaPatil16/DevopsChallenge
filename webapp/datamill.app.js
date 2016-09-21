angular.module('datamill', ['ngMaterial',
  'ngMessages',
  'ui.router',
  'mdPickers',
  'ngAvatar',
  'satellizer'
])

.controller('datamillCtrl', ['$scope', '$state', '$auth', '$rootScope', 'profileservice', '$mdDialog',
  function($scope, $state, $auth, $rootScope, profileservice, $mdDialog) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    function showAlert(error) {
      alert = $mdDialog.alert()
        .title('Attention')
        .textContent('Not Authourized:' + error)
        .ok('Close');
      $mdDialog
        .show(alert)
        .finally(function() {
          alert = undefined;
        });
    }
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(res) {
          console.log(res);
          $state.go('datamill.dashboard');
        }).catch(function(err) {
          console.log(err);
          if (err.status == 422) {
            showAlert(err.data.error)
          }
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
