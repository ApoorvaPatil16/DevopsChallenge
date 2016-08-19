angular.module('datamill', ['ngMaterial',
    'ngMessages',
    'ui.router',
    'mdPickers'
  ])
  .controller('datamillController', ['$scope', '$state',
    function($scope, $state) {
      $state.go('home');
    }
  ]);
