angular.module('datamill')
    .controller('datamodeldefinationController', ['$scope', 'datamodeldefinationservice', 'listDomainFactory', '$state', '$stateParams', '$mdDialog', '$log', function($scope, datamodeldefinationservice, listDomainFactory, $state, $stateParams, $mdDialog, $log) {
        var domain;
        var domainName;
        //deciding mode and also getting related data
        // getting the domain list from server
        listDomainFactory.getAllDomain().then(function(res) {   
            domain = res;
            // console.log(res);
            domainName = domain.map(function(d) {
                return d.name;
            });   
        }, function(res) { $log.info("failed to get"); });
        //...........................................//
        if ($stateParams.mode === 'edit') {
            $scope.dataModel = $stateParams.dataModel;
<<<<<<< HEAD
            //console.log("99999999999999999999999999999999999999999999", $scope.dataModel);
=======
            console.log("array of edit", $scope.dataModel);
>>>>>>> d637e05e6388b87abec11e3d53b5d77adfbc2d7d
            updateMaster($scope.dataModel);

            $scope.isedit = true;
            if (!$scope.dataModel.patternstruct) {
                $scope.dataModel.patternstruct = [];
            }
            if ($stateParams.dataModel.name === $stateParams.datamodelname) {
                $scope.dataModel = $stateParams.dataModel;
                updateMaster($scope.dataModel);
                datamodeldefinationservice.getStructure($stateParams.datamodelname).then(function(res) {
                    console.log("Here we getting getStructure", res);
                    if (res && res.attributes[0]) $scope.dataModel.attributes = res.attributes;

                    else $scope.dataModel.attributes = [];
                    updateMaster($scope.dataModel);
                    ///console.log("changed the value", $scope.dataModel.attributes)
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
                "patterns": [],
                "patternstruct": [],
                "username": "lokesh"
            }
            updateMaster($scope.dataModel);
            $scope.isedit = false;
        }

        function updateMaster(datamodel) {
            $scope.masterdataModel = angular.copy(datamodel);
            console.log("master data", $scope.masterdataModel, $scope.dataModel)
        }
        /*Getting Data Model Input config*/
        datamodeldefinationservice.getDataModelConfig().then(function(res) { $scope.datamodelconf = res;    });

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

        $scope.showAdvanced = function(ev, object) {
            if (!$scope.dataModel.patternstruct) {
                $scope.dataModel.patternstruct = [];
            }
            var array = $scope.dataModel.patternstruct;
            console.log("array", array);
            var len = array.length;
            for (var i = 0; i < len; i++) {
                if (array[i].name == object.name) {
                    $scope.val = array[i];
                    break;
                }
            }
            $mdDialog.show({
                controller: 'editPatternCtrl',
                templateUrl: '/datamodeldefination/templates/editpattern.html',
                locals: {
                    object: object,
                    patternattributes: $scope.val.attributes
                },
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            }).then(function(result) {
                console.log("data from dialog", result);

            }, function(result) {

            });
        };
        $scope.showDialog = function(ev) {
            $mdDialog.show({
                    controller: 'patterndialogCtrl',
                    templateUrl: '/datamodeldefination/templates/patterndialog.html',
                    locals: {
                        attributes: $scope.dataModel.attributes
                    },
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(result) {
                    var mix = null;
                    var len = 0;
                    // if (!$scope.dataModel.patternstruct) {
                    //     $scope.dataModel.patternstruct = [];
                    // }

                    $scope.dataModel.patternstruct.push({ "name": result.name, "attributes": result.structure });
                    $scope.dataModel.patterns.push({ "name": result.name, "mix": 0 });
                    if ($scope.dataModel.patterns) {
                        len = $scope.dataModel.patterns.length;
                        mixValue = 100 / len;
                        if ((mixValue % 1) === 0) {
                            $scope.dataModel.patterns.forEach(function(pattern) {
                                pattern.mix = mixValue;
                            })
                        } else {
                            var mix = Math.floor(mixValue);
                            var rem = 100 - (mix * (len - 1));
                            for (var i = 0; i < (len - 1); i++) {
                                $scope.dataModel.patterns[i].mix = mix;
                            }
                            $scope.dataModel.patterns[len - 1].mix = rem;
                        }
                    }

                }, function(result) {
                    console.log("Data from dialog on cancel: ", result);
                });
        };

        $scope.uploadJson = function(json) {
            var dataobject = parseString(json);
            var outputData = [];
            var type;
            var count = 0;
            var option;
            //console.log(domain[5]);
            for (var i in dataobject) {
                console.log("value of i=", i);
                var date = Date.parse(dataobject[i]);
                if (isNaN(dataobject[i])) {
                    if (isNaN(date)) {
                        type = "String",
                            option = domain[5];
                    } else {
                        type = "TimeStamp",
                            option = domain[6]
                    }

                } else {
                    type = "Number",
                        option = domain[4]
                }
                outputData.push({
                    "domain": type,
                    "name": i,
                    "options": option
                });
            }
            //@TODO: vadlidation in TextArea as well as Responsive
            console.log("domains=", domain);
            console.log("domain names=", domainName);
            $scope.dataModel.attributes = outputData;
        }

        function parseString(data) {
            if ((typeof data) === 'string') {
                data = JSON.parse(data);
                return data;
            }

        }
        $log.info("datamodeldefinationController is registered");
    }]);
