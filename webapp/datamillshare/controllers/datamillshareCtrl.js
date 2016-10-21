angular.module('datamill')
    .controller('datamillshareCtrl', ['$scope', '$location', function($scope, $location) {
        var queryParam = $location.search();
        var myvalue = queryParam.hasOwnProperty('d') && queryParam['d'];
        var myvalue = queryParam.hasOwnProperty('u') && queryParam['u'];


    }]);
