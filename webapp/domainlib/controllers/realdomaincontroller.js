angular.module('datamill')
  .controller('realDomainCtrl', ['$timeout', '$filter', '$scope', 'listdataService', '$timeout', '$q', '$log', 'randomDomainFactory', '$mdDialog', '$state', function($timeout, $filter, $scope, listdataService, $timeout, $q, $log, randomDomainFactory, $mdDialog, $state) {
    var ctrl = this;
    ctrl.functionNames = ['Prefix', 'Suffix', 'UpperCase', 'LowerCase', 'CamalCase'];
    ctrl.realDomain = { 'type': 'Real Domain' };
    ctrl.states = [];
    listdataService.getdatasources().then(function(res) {
      ctrl.states = loadAll();
      console.log(ctrl.states);
      function loadAll() {
        return res.map(function(state) {
          return {
            value: state.name.toLowerCase(),
            display: state.name
          };
        });
      };
    });
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
      ctrl.realDomain.base = ctrl.selectedItem.display;
      // ctrl.realDomain.transformers = ctrl.selectFunction;
      ctrl.realDomain.transformers = [];
      ctrl.selectFunction.forEach(function(v) {
        if (v == "Prefix") {
          var obj = { 'name': v, 'value': $scope.status.prefix };
          ctrl.realDomain.transformers.push(obj);
        } else if (v == "Suffix") {
          var obj = { 'name': v, 'value': $scope.status.suffix };
          ctrl.realDomain.transformers.push(obj);
        } else {
          var obj = { 'name': v, 'value': '' };
          ctrl.realDomain.transformers.push(obj);
        }
      });
      randomDomainFactory.postNewDomain(ctrl.realDomain).then(function(response) {
        $log.info("success");
        var alert = $mdDialog.alert({
          title: 'Success',
          textContent: "Successfully created real domain: " + response.data.name,
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
    ctrl.selectFunction = [];
    $scope.status = {};
    $scope.showDialog = function(ev, name) {
      console.log(ctrl.selectFunction);
      if ((name == 0 || name == 1)) {
        if (ctrl.selectFunction.indexOf("Prefix") > -1 && name == 0) {
          return;
        }
        if (ctrl.selectFunction.indexOf("Suffix") > -1 && name == 1) {
          return;
        }
        $mdDialog.show({
            controller: showFunctionsCtrl,
            templateUrl: '/domainlib/templates/showFunctionsDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen
          })
          .then(function(answer) {
            if (name == 0) {
              $scope.status.prefix = answer;
            }
            if (name == 1) {
              $scope.status.suffix = answer;
            }
            console.log($scope.status);
          }, function() {
            $log.info('You cancelled the dialog.');
          });
      }
    }

    function showFunctionsCtrl($scope, $mdDialog) {
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

  }]);
