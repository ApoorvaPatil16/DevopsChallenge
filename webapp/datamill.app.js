angular.module('datamill', ['ngMaterial',
    'ngMessages',
    'ui.router',
    'mdPickers',
    'ngAvatar'
  ])
  .controller('datamillCtrl', ['$scope', '$state',
    function($scope, $state) {
      $state.go('datamill.dashboard');
    }
  ]);
