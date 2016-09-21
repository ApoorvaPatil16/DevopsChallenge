angular.module('datamill')
  .controller('datafeedCtrl', datafeedCtrl);

function datafeedCtrl($timeout, $q, $log, $filter, datafeedService, $scope, $mdDialog, options) {
  var ctrl = this;
  if (options) {
    $scope.datafeed = options;
    if ($scope.datafeed.start) $scope.datafeed.start = new Date($scope.datafeed.start);
    if ($scope.datafeed.end) $scope.datafeed.end = new Date($scope.datafeed.end);
  }
  $scope.pattern = "Pattern Matches";
  datafeedService.getTransportType().then(function(res) {
    ctrl.transports = res;
    ctrl.transportName = ctrl.transports.map(function(d) {
      return d.name;
    });
    console.log(ctrl.states);
  });
  ctrl.color = {
    blue: Math.floor(Math.random() * 200)
  };
  ctrl.isDisabled = false;
  ctrl.querySearch = querySearch;
  $scope.saveOption = function(answer) {
    $log.info(answer);
    $mdDialog.hide(answer);
  };
  $scope.cancelOption = function() {
    $mdDialog.cancel();
  }

  function querySearch(query) {
    var results = query ? ctrl.transportName.filter(createFilterFor(query)) : ctrl.transportName;
    return results;
  }

  function createFilterFor(query) {

    return function filterFn(name) {
      return (name.toLowerCase().indexOf(query.toLowerCase()) === 0);
    };

  }

  $log.info("datafeedCtrl is registered");
}
