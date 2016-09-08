angular.module('datamill')
  .controller('realDomainCtrl', ['$timeout', '$filter', '$scope', 'listdataService', '$timeout', '$q', '$log', 'randomDomainFactory', '$mdDialog', '$state', function($timeout, $filter, $scope, listdataService, $timeout, $q, $log, randomDomainFactory, $mdDialog, $state) {
    var self = this;
    self.functionNames = ['Prefix', 'Suffix', 'UpperCase', 'LowerCase', 'CamalCase'];
    self.realDomain = { 'type': 'Real Domain' };
    self.states = [];
    listdataService.getdatasources().then(function(res) {
      self.states = loadAll();

      function loadAll() {
        return res.map(function(state) {
          return {
            value: state.name.toLowerCase(),
            display: state.name
          };
        });
      };
    });
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;

    function querySearch(query) {
      var results = query ? self.states.filter(createFilterFor(query)) : self.states,
        deferred;
      return results;
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }

    $scope.createRealDomain = function() {
      self.realDomain.baseDataSource = self.selectedItem.display;
      self.realDomain.functions = self.selectFunction;
      randomDomainFactory.postNewDomain(self.realDomain).then(function(id) {
        $log.info("success");
        var alert = $mdDialog.alert({
          title: 'Success',
          textContent: "Successfully created real domain with id: " + id,
          ok: 'Close'
        });
        $mdDialog.show(alert);
        $state.go('datamill.listdomain');
        $scope.randomDomain = {};
      }, function(res) {
        $log.info("fail");
        var alert = $mdDialog.alert({
          title: 'Fail',
          textContent: "Unable to create domain",
          ok: 'Close'
        });
        $mdDialog.show(alert);
      });
    }
  }]);
