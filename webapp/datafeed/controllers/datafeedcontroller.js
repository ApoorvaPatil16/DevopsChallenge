angular.module('datamill')
.controller('datafeedCtrl', AppCtrl); 
function AppCtrl($timeout, $q, $log,$filter,datafeedService,$scope) {
	var self = this;
  datafeedService.getTransportType().then(function (res) {
   self.states=res;
   console.log(self.states);
 });
  self.color = {
    blue: Math.floor(Math.random() * 200)
  };
  self.simulateQuery = false;
  self.isDisabled    = false;
  self.rating1=50;
  self.querySearch   = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange   = searchTextChange;

  function querySearch (query) {
    var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
    deferred;
    if (self.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
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
}