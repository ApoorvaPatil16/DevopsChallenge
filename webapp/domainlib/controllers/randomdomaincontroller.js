angular.module('datamill')
    .controller('randomDomainCtrl', ['$filter', '$state', '$stateParams', '$scope', '$mdDialog', '$log', 'listDomainFactory', 'randomDomainFactory', function($filter, $state, $stateParams, $scope, $mdDialog, $log, listDomainFactory, randomDomainFactory) {
        $scope.randomDomain = {
            'name': ""
        };

        $scope.randomDomain.range = [];
        $scope.base = "";
        $scope.inputLabelsForDomain = {
            "domainName": "Domain Name",
            "domainType": "Base Type",
            "domainRange": "Range",
            "pattern": "Format/Pattern"
        };
        randomDomainFactory.getRandomDomainItems().then(function(res) {
            $scope.types = res;
        });
        $scope.status = '  ';
        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                    controller: panelDialogCtrl,
                    templateUrl: '/domainlib/templates/patterndialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen
                })
                .then(function(answer) {
                    $scope.status = answer;
                }, function() {
                    $log.info('You cancelled the dialog.');
                });
        };
        $scope.randomDomain = $stateParams.randomDomain;
        $scope.mode = $stateParams.mode;
        if ($scope.randomDomain.base == "Date") {
            var fromDate = new Date($scope.randomDomain.range[0].min * 1000);
            $scope.randomDomain.range[0].min = fromDate;
            var toDate = new Date($scope.randomDomain.range[0].max * 1000);
            $scope.randomDomain.range[0].max = toDate;
        }

        $scope.createRandomDomain = function() {
            if ($scope.mode == "create") {
                if ($scope.randomDomain.base) {
                    $scope.randomDomain.type = "Random Generated Domain";
                    if ($scope.randomDomain.base == "String") {
                        $scope.randomDomain.range[0].rangeOf = "words";
                        $scope.randomDomain.range[0].rangeOf = "length";
                        var range = {};
                        angular.copy($scope.randomDomain.range, range);
                        $scope.randomDomain.range = [];
                        Object.keys(range).forEach(function(k) {
                            $scope.randomDomain.range.push(range[k]);
                        });
                    } else if ($scope.randomDomain.base == "Number" || $scope.randomDomain.base == "Decimal" || $scope.randomDomain.base == "Time" || $scope.randomDomain.base == "Date") {
                        $scope.randomDomain.range[0].rangeOf = "value";
                        if ($scope.randomDomain.base == "Date" || $scope.randomDomain.base == "Time") {
                            //$scope.randomDomain.range[0].min=$filter('date')($scope.randomDomain.range[0].min,'','+0530');
                            console.log($scope.randomDomain.range[0].min);
                            $scope.randomDomain.range[0].min = (new Date($scope.randomDomain.range[0].min).getTime() / 1000).toFixed(0);
                            $scope.randomDomain.range[0].max = (new Date($scope.randomDomain.range[0].max).getTime() / 1000).toFixed(0);
                        }
                        var range = {};
                        angular.copy($scope.randomDomain.range, range);
                        $scope.randomDomain.range = [];
                        Object.keys(range).forEach(function(k) {
                            $scope.randomDomain.range.push(range[k]);
                        });
                    }
                    randomDomainFactory.postNewDomain($scope.randomDomain).then(function(res) {
                        $log.info(res);
                        var alert = $mdDialog.alert({
                            title: 'Success',
                            textContent: "Successfully created random domain: " + res.data.name,
                            ok: 'Close'
                        });
                        if (res.data.code == 11000) {
                            var alert = $mdDialog.alert({
                                title: 'Error',
                                textContent: "Domain name already exists",
                                ok: 'Close'
                            });
                            $mdDialog.show(alert);
                            return;
                        }
                        $mdDialog.show(alert);
                        $state.go('datamill.listdomain');
                    }, function(err) {
                        $log.info("fail");
                        var alert = $mdDialog.alert({
                            title: 'Fail',
                            textContent: "Unable to create domain",
                            ok: 'Close'
                        });
                        $mdDialog.show(alert);
                    });
                } else {
                    $scope.errForType = "Please Select Base Type";
                }

            } else {
                if ($scope.randomDomain.base == "Date" || $scope.randomDomain.base == "Time") {
                    //$scope.randomDomain.range[0].min=$filter('date')($scope.randomDomain.range[0].min,'','+0530');
                    console.log($scope.randomDomain.range[0].min);
                    $scope.randomDomain.range[0].min = (new Date($scope.randomDomain.range[0].min).getTime() / 1000).toFixed(0);
                    $scope.randomDomain.range[0].max = (new Date($scope.randomDomain.range[0].max).getTime() / 1000).toFixed(0);
                }
                randomDomainFactory.updateDomain($scope.randomDomain).then(function(res) {
                        $log.info(res);
                        var alert = $mdDialog.alert({
                            title: 'Success',
                            textContent: "Successfully updated random domain: " + res.data.name,
                            ok: 'Close'
                        });
                        $mdDialog.show(alert);
                        $state.go('datamill.listdomain');
                        $scope.randomDomain = {};
                    },
                    function(err) {
                        $log.info("fail");
                        var alert = $mdDialog.alert({
                            title: 'Fail',
                            textContent: "Unable to update domain",
                            ok: 'Close'
                        });
                        $mdDialog.show(alert);

                    })
            }
        }

    }]);


function panelDialogCtrl($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
}
