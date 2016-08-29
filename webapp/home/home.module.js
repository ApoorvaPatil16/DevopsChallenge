angular.module('datamill')
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('grey', {
        'default': '900',
        'hue-1': '800',
        'hue-2': '700',
        'hue-3': '600'
      })
      .accentPalette('grey', {
        'default': '600',
        'hue-1': '500',
        'hue-2': '400',
        'hue-3': '300'
      })
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('Theme1')
      .primaryPalette('grey', {
        'default': '900'
      })
      .accentPalette('grey', {
        'default': '700'
      })
  })
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('datamill', {
        views: {
          "appBar": {
            templateUrl: "/home/templates/appBar.html",
            controller: 'appBarCtrl',
            controllerAs: 'appbarCtrl'
          },
          "content@": {
            templateUrl: "/home/templates/content.html"
          },
          "footer": {
            templateUrl: "/home/templates/footer.html"
          }
        }
      });
    }
  ]);
