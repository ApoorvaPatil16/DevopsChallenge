angular.module('datamill')
  .controller('realDomainCtrl', ['$stateParams', '$timeout', '$filter', '$scope', 'listdataService', '$timeout', '$q', '$log', 'randomDomainFactory', '$mdDialog', '$state', function($stateParams, $timeout, $filter, $scope, listdataService, $timeout, $q, $log, randomDomainFactory, $mdDialog, $state) {
    var ctrl = this;
    ctrl.functionNames = ['Prefix', 'Suffix', 'UpperCase', 'LowerCase', 'CamalCase'];
    ctrl.realDomain = { 'type': 'Real Domain' };
    ctrl.states = [];
    ctrl.realDomain.transformers = [];
    $scope.status = {};
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
    ctrl.realDomain = $stateParams.realDomain;
    ctrl.mode = $stateParams.mode;
    ctrl.selectedItem = ctrl.realDomain.base;
    ctrl.selectFunction = [];
    if (ctrl.realDomain.transformers) {
      for (var i = 0; i < ctrl.realDomain.transformers.length; i++) {
        ctrl.selectFunction[i] = ctrl.realDomain.transformers[i].name;
        if (ctrl.realDomain.transformers[i].name == "Prefix") {
          $scope.status.prefix = ctrl.realDomain.transformers[i].value;
        }
        if (ctrl.realDomain.transformers[i].name == "Suffix") {
          $scope.status.suffix = ctrl.realDomain.transformers[i].value;
        }
      }
    }
    $scope.createRealDomain = function() {
      if (!ctrl.selectedItem) {
        ctrl.errmsg = "Please enter base source.";
        return;
      }
      ctrl.errmsg = "";
      ctrl.realDomain.base = ctrl.selectedItem.display;
      ctrl.realDomain.transformers = [];
      // ctrl.realDomain.transformers = ctrl.selectFunction;
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
      if (ctrl.mode == 'create') {
        ctrl.realDomain.type = "Real Domain";
        console.log(ctrl.realDomain);
        randomDomainFactory.postNewDomain(ctrl.realDomain).then(function(response) {
          console.log(response);
          var alert = $mdDialog.alert({
            title: 'Success',
            textContent: "Successfully created real domain: " + response.data.name,
            ok: 'Close'
          });
          if (response.status == 500) {
            var alert = $mdDialog.alert({
              title: 'Error',
              textContent: "Domain name already exists",
              ok: 'Close'
            });
            $mdDialog.show(alert);
            return;
          }
          $mdDialog.show(alert);
          ctrl.realDomain = {};
          $state.go('datamill.listdomain');
        }, function(res) {
          $log.info("fail");
          var alert = $mdDialog.alert({
            title: 'Fail',
            textContent: "Unable to create domain",
            ok: 'Close'
          });
          $mdDialog.show(alert);
        });
      } else {
        randomDomainFactory.updateDomain(ctrl.realDomain).then(function(res) {
            $log.info(res.data);
            var alert = $mdDialog.alert({
              title: 'Success',
              textContent: "Successfully updated real domain: " + res.data.name,
              ok: 'Close'
            });
            $mdDialog.show(alert);
            ctrl.realDomain = {};
            $state.go('datamill.listdomain');
          },
          function(err) {
            $log.info("fail");
            var alert = $mdDialog.alert({
              title: 'Fail',
              textContent: "Unable to update domain",
              ok: 'Close'
            });
            $mdDialog.show(alert);

          })
      }
    }
    $scope.showDialog = function(ev, name) {
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
            clickOutsideToClose: false,
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
