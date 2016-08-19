angular.module('datamill')
.controller('AppCtrl', AppCtrl); 
function AppCtrl($timeout, $q, $log,$filter) {
	var self = this;
  // self.patterns= [{
  //   "name": ['pattern1','pattern2'];
  // }];
	self.color = {
		blue: Math.floor(Math.random() * 200)
	};
 self.simulateQuery = false;
    self.isDisabled    = false;
self.rating1=50;
    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    // self.newState = newState;

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

     function loadAll() {
      var allStates = 'Mongo DB, Redis, Redis MQ, Kafka, WebSocket';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
}

}