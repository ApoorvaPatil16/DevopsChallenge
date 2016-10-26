angular.module('datamill')
    .controller('editPatternCtrl', function($scope, object, patternattributes, $mdDialog) {
        var ctrl = this;
        $scope.patternStructure = JSON.parse(JSON.stringify(patternattributes));

        $scope.patternName = object.name;

        console.log($scope.patternStructure, "hello");
        $scope.Okay = function() {
            var data = {};
            data = {
                "structure": $scope.patternStructure,
                "name": $scope.patternName
            };

            $mdDialog.hide(data);
            console.log(data, "data");
        }

        $scope.cancel = function() {
            $mdDialog.hide();
        }
    });
