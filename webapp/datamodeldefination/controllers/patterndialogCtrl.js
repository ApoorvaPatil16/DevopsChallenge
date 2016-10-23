angular.module('datamill')
    .controller('patterndialogCtrl', function($scope, attributes, $mdDialog) {
        $scope.dataModelStructure = JSON.parse(JSON.stringify(attributes));

        var ctrl = this;

        $scope.save = function() {
            var data = {};
            data = {
                "structure": $scope.dataModelStructure,
                "name": $scope.patterns.name
            };
            console.log("datamodelattr" + $scope.dataModelStructure);
            $mdDialog.hide(data);


        };
        $scope.cancel = function() {
            $mdDialog.hide();
        }
    });
