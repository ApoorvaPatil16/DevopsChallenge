angular.module('datamill')
    .controller('datamodeldefinationController', ['$scope', 'datamodeldefinationservice', '$state', '$stateParams', '$mdDialog', '$log', function($scope, datamodeldefinationservice, $state, $stateParams, $mdDialog, $log) {
        //deciding mode and also getting related data
        if ($stateParams.mode === 'edit') {
            $scope.dataModel = $stateParams.dataModel;
            updateMaster($scope.dataModel);
            $scope.isedit = true;
            if ($stateParams.dataModel.name === $stateParams.datamodelname) {
                $scope.dataModel = $stateParams.dataModel;
                updateMaster($scope.dataModel);
                datamodeldefinationservice.getStructure($stateParams.datamodelname).then(function(res) {
                    console.log("Here we geting getStructure", res);
                    if (res && res.attributes[0]) $scope.dataModel.attributes = res.attributes;
                    else $scope.dataModel.attributes = [];
                    updateMaster($scope.dataModel);
                    //console.log("changed the value", $scope.dataModel.attributes)
                })
            } else {
                datamodeldefinationservice.getFullDatamodel($stateParams.datamodelname).then(function(res) {
                        $scope.dataModel = res;
                    })
                    // @TODO for direct URL work
            }
        } else if ($stateParams.mode === 'create') {
            $scope.dataModel = {
                "name": '',
                "description": '',
                "attributes": [],
                "username": "vishal"
            }
            updateMaster($scope.dataModel);
            $scope.isedit = false;
        }

        function updateMaster(datamodel) {
            $scope.masterdataModel = angular.copy(datamodel);
            console.log("master data", $scope.masterdataModel, $scope.dataModel)
        }
        /*Getting Data Model Input config*/
        datamodeldefinationservice.getDataModelConfig().then(function(res) {    $scope.datamodelconf = res;    });
        // Adding Attributes Variable for on Fly showing
        $scope.addAttribute = function(attr) {
            console.log("me inside save main have data:" + attr);
            if (attr) {
                $scope.dataModel.attributes.push(attr);
            }
        };
        //for Reset the data to early stage
        $scope.reset = function() {
                angular.copy($scope.masterdataModel, $scope.dataModel);
            }
            // For Delivery option modal opening
        $scope.showDeliveryOption = function(ev, state) {
            $log.info(state);
            // to show the deliveryOption
            if (!$scope.dataModel[state]) $scope.dataModel[state] = {};
            $mdDialog.show({
                controller: state + 'Ctrl',
                controllerAs: 'ctrl',
                templateUrl: '/datamodeldefination/' + state + '/templates/' + state + '.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true,
                locals: { options: $scope.dataModel[state] }
            }).then(function(answer) {
                $log.info(answer);
                $scope.dataModel[state] = answer;
            }, function() {}).finally(function() {});
        };
        // for posting/patching the data to the server
        $scope.saveDataModel = function() {
            console.log("dataModel we request for edit", $scope.dataModel);
            if ($stateParams.datamodelname) {
                datamodeldefinationservice.patchDataModel($scope.dataModel, $stateParams.datamodelname).then(function(res) {
                        console.log("AA", res);
                        console.log("stateParams", $stateParams.datamodelname);
                        showSuccessAlert(res.name);
                    },
                    function(res) {
                        showErrorAlert(res);
                    });
            } else {
                datamodeldefinationservice.postDataModel($scope.dataModel).then(function(res) {
                        $log.info("submitted successfully " + res);
                        showSuccessAlert(res.name);
                    },
                    function(res) {
                        $log.info(res);
                        showErrorAlert(res);
                    });
            }
        };
        // for canceling the data model
        $scope.cancelDataModel = function() {
                $state.go('datamill.dashboard');
            }
            // @TODO Reset Button
            // datamodel create success message show
        function showSuccessAlert(name) {
            alert = $mdDialog.alert()
                .title('Saved')
                .textContent('Submitted Data Model:' + name)
                .ok('Close');
            $mdDialog
                .show(alert)
                .finally(function() {
                    $state.go('datamill.dashboard');
                    alert = undefined;
                });
        }

        function showErrorAlert(Error) {
            alert = $mdDialog.alert()
                .title('Attention')
                .textContent('Error Occurred:' + Error)
                .ok('Close');
            $mdDialog
                .show(alert)
                .finally(function() {
                    alert = undefined;
                });
        }
        $log.info("datamodeldefinationController is registered");
    }]);
