angular.module('datamill')
    .controller('domainController', ['$scope', '$mdDialog', function($scope, $mdDialog) {
        $scope.dataRealRandom = {
            'type': "",
        }
        $scope.baseType = "";
        $scope.inputLabelsForDomain = {
            domainName: "Domain Name",
            domainType: "Base Type",
            domainRange: "Range",
            pattern: 'Format/Pattern'
        };
        $scope.types = [
            'String', 'Number', 'Boolean', 'Date', 'Time', 'Decimal', 'Hexadecimal'
        ];
        $scope.status = '  ';
        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '/domain/randomdomain/templates/patterndialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen
                })
                .then(function(answer) {
                    $scope.status = 'You pressed "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });

            
        };
    }]);

    function DialogController($scope, $mdDialog) {
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
