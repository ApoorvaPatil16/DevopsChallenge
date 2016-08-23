angular.module('datamill')
  .controller('datafeedCtrl', datafeedCtrl);

function datafeedCtrl($timeout, $q, $log, $filter, datafeedService, $scope, $mdDialog) {
  var ctrl = this;
  datafeedService.getTransportType().then(function(res) {
    ctrl.states = res;
    console.log(ctrl.states);
  });
  ctrl.color = {
    blue: Math.floor(Math.random() * 200)
  };
  ctrl.simulateQuery = false;
  ctrl.isDisabled = false;
  ctrl.rating1 = 50;
  ctrl.querySearch = querySearch;
  ctrl.selectedItemChange = selectedItemChange;
  ctrl.searchTextChange = searchTextChange;

  function querySearch(query) {
    var results = query ? ctrl.states.filter(createFilterFor(query)) : ctrl.states,
      deferred;
    if (ctrl.simulateQuery) {
      deferred = $q.defer();
      $timeout(function() { deferred.resolve(results); }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }

  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }

  function selectedItemChange(itesm) {
    $log.info('Item changed to ' + JSON.stringify(item));
  }
  $mdDialog.show({
    //controller: DialogController,
    contentElement: '#deliveryOption',
    parent: angular.element(document.body),
    //targetEvent: ev,
    clickOutsideToClose: true,
    fullscreen: true
  });
}
