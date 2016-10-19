angular.module('datamill')
    .controller('patterndialogCtrl', function($scope, attributes, $mdDialog) {
        $scope.dataModelStructure = JSON.parse(JSON.stringify(attributes));
        var ctrl = this;
        var patternstruct = [];
        $scope.save = function() {
            $mdDialog.hide($scope.dataModelStructure);
            console.log($scope.dataModelStructure);
            $scope.dataModel.patternstruct.push($scope.dataModelStructure);
            // console.log($scope.dataModel.patternStruct, "its my struct");
        };
        $scope.cancel = function() {
            $mdDialog.hide();
        }
    });
