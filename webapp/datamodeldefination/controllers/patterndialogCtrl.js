angular.module('datamill')
    .controller('patterndialogCtrl', function($scope, attributes, $mdDialog) {
        $scope.patternstruct = JSON.parse(JSON.stringify(attributes));
        var ctrl = this;
        $scope.submit = function() {
            var data = {};
            data = {
                "structure": $scope.patternstruct,
                "name": $scope.patterns.name
            };
            console.log("datamodelattr" + data.structure);
            $mdDialog.hide(data);
        };
        $scope.cancel = function() {
            $mdDialog.hide();
        }
    });
