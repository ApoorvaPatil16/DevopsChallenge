angular.module('datamill', ['ngMaterial',
    'ngMessages',
    'ui.router',
    'mdPickers',
    'ngAvatar',
    'satellizer'
])

.controller('datamillCtrl', ['$scope', '$state', '$auth', '$rootScope', '$location', 'profileservice', '$mdDialog',
    function($scope, $state, $auth, $rootScope, $location, profileservice, $mdDialog) {
        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };

        $scope.isDataModelShareAccess = function() {
            //Check if the user landed on datamill for accessing the shared data model
            //This can be checked by inspecting the search string for the appropraite query parameter
            var query = $location.search();
            var queryParam1 = query['d'];
            var queryParam2 = query['u'];
            //         console.log(queryParam1);
            console.log("Host ", $location.host());
            console.log("Path ", $location.path());
            console.log("Search string ", $location.search());

            if ((queryParam1 != null) && (queryParam2 != null)) {
                console.log("queryParam1", queryParam1);
                console.log("queryParam1", queryParam2);
                return (true);


            } else {

                console.log("error");
            }


        }

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
                    profileservice.getProfile().then(function(res) {
                        $scope.user = res;
                    })
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


        if ($scope.isAuthenticated()) {
            //$state.go('datamill.dashboard');

            if ($scope.isAuthenticated() && $scope.isDataModelShareAccess()) {
                $state.go('datamill.datamodelshare');
            } else {
                $state.go('datamill');
            }
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
