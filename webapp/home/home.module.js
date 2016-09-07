angular.module('datamill')


.config(function($mdThemingProvider) {
    $mdThemingProvider.definePalette('palegreen', {
      '50': '#f2f8f2',
      '100': '#c0dcc0',
      '200': '#9cc89c',
      '300': '#6eaf6e',
      '400': '#5ba45b',
      '500': '#509050',
      '600': '#457c45',
      '700': '#3a693a',
      '800': '#2f552f',
      '900': '#244124',
      'A100': '#f2f8f2',
      'A200': '#c0dcc0',
      'A400': '#5ba45b',
      'A700': '#3a693a',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 200 300 400 A100 A200 A400'
    })
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('palegreen', {
        'default': 'A400',
        'hue-1': 'A100',
        'hue-2': '800',
        'hue-3': 'A100'
      })
      .accentPalette('palegreen', {
        'default': '200',
        'hue-1': '50',
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
