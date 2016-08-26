angular.module('datamill')
  .controller('listdomainCtrl', ['$scope', 'listDomainFactory', function($scope, listDomainFactory) {
    listDomainFactory.getDomainItems().then(function(res) {
      $scope.domainItems = res;
    });
  }]);
