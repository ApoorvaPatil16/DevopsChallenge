angular.module('datamill')
    .controller('datamillshareCtrl', ['$scope', '$state', 'datamillshareservice',
        '$stateParams', '$auth',
        function($scope, $state, datamillshareservice, $stateParams, $auth) {
            $scope.sharedEntityName = "";
            $scope.errorMessage = "";
            $scope.entityType = $stateParams.e;
            $scope.ownerName = $stateParams.o;
            $scope.entityName = $stateParams.n;
            $scope.sharedDate = $stateParams.d;

            if ($scope.entityType !== null && $scope.ownerName !== null && $scope.entityName !== null) {
                //this is a valid shared URL state access

                //If the shared owner and current logged in user are different, copy the shared entity to current user
                if ($scope.ownerName !== $auth.getPayload().email) {
                    if ($scope.entityType == 'dm') {
                        //User is trying to share a data model
                        $scope.sharedEntityName = "Data model";

                        //How to share data model?
                        //Copy the data model from original user to current logged in user 
                        /* datamillshareservice.copySharedDataModel($auth.getPayload().email, $scope.ownerName, $scope.entityName)
                             .then(function(copiedDataModel) {
                                 //Successfully copied the shared model to current user
                             }, function(err) {
                                 //Error in sharing the datamodel 
                                 $scope.errorMessage = "";
                             });*/
                    }

                } else {
                    $scope.errorMessage = "Invalid access of shared entity";
                }
            }

            // $state.go('datamill');
        }
    ]);
