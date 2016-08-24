angular.module('datamill', ['ngMaterial',
    'ngMessages',
    'ui.router',
    'mdPickers'
  ])
  .controller('datamillCtrl', ['$scope', '$state',
    function($scope, $state) {
      $state.go('datamill.dashboard');
    }
  ]);
