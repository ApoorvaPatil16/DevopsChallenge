angular.module('datamill')
    .controller('datausageCtrl', function($scope, datausageservice) {
        $scope.statistics = {};
        datausageservice.getUsers().then(function(res) {
            // console.log("users=", res);
            $scope.statistics["Users"] = res;

            // console.log($scope.statics);
        });
        datausageservice.getDatamodels().then(function(res) {
            // console.log("Models=", res);
            $scope.statistics["Models"] = res;
        });
        datausageservice.getDatasource().then(function(res) {
            // console.log("DataSources=", res);
            $scope.statistics["DataSources"] = res;
        });
        datausageservice.getDatadomains().then(function(res) {
            // console.log("Datadomains=", res);
            $scope.statistics["DataDomains"] = res;
        });
        console.log($scope.statistics);
    });
