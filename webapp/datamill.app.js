angular.module('datamill', ['ngMaterial',
    'ngMessages',
    'ui.router',
    'mdPickers',
    'ngAvatar',
    'satellizer'
  ])
  .controller('datamillCtrl', ['$scope', '$state',
    function($scope, $state) {
      $state.go('datamill.dashboard');
    }
  ]);
