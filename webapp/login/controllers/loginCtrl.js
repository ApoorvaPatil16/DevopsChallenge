angular.module('datamill')
  .controller('loginCtrl', ['$scope', '$log', '$auth', '$http', function($scope, $log, $auth, $http) {
    console.log("loginCtrl");
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(res) {
          var param = {
            'code': res.code,
            'client_id': "15ccef8b737c4839249e",
            "client_secret": "196e0ee75fe8854c6f687712d6021a7fb0e01016"
          };
          $http({
            type: "POST",
            url: 'https://github.com/login/oauth/access_token?client_id=15ccef8b737c4839249e&client_secret=196e0ee75fe8854c6f687712d6021a7fb0e01016&code=' + res.code,
            xhrFeilds: {
              withCredentials: false
            }
          }).then(function(res) {

            console.log(JSON.stringify(res));
          }, function(res) {
            console.log(JSON.stringify(res));
          })
          console.log(JSON.stringify(res));
          $log.log('You have successfully signed in with ' + provider + '!');
          //$location.path('/');
        });
    };
  }])
