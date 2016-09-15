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
    $mdThemingProvider.definePalette('deeppurple', {
      '50': '#cfafdd',
      '100': '#af79c6',
      '200': '#9852b6',
      '300': '#6f3987',
      '400': '#5e3071',
      '500': '#4c275c',
      '600': '#3a1e46',
      '700': '#281531',
      '800': '#170c1c',
      '900': '#050306',
      'A100': '#cfafdd',
      'A200': '#af79c6',
      'A400': '#5e3071',
      'A700': '#281531',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': '50 100 A100 A200'
    })
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('theme1')
      .primaryPalette('deeppurple', {
        'default': '500',
        'hue-1': 'A100',
        'hue-2': '500',
        'hue-3': 'A100'
      })
      .accentPalette('deeppurple', {
        'default': '200'
      })
  })
  .config(['$stateProvider', '$urlRouterProvider', '$authProvider',
    function($stateProvider, $urlRouterProvider, $authProvider) {
      $stateProvider.state('datamill', {
        url: '/datamill',
        controller: 'datamillCtrl',
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
      $authProvider.github({
        url: '/oauth/github',
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        //responseType: 'token',
        optionalUrlParams: ['scope'],
        scope: ['user'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: { width: 1020, height: 618 },
        clientId: "15ccef8b737c4839249e"
      });
      $authProvider.google({
        url: '/auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        //redirectUri: window.location.origin,
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        scope: ['profile', 'email'],
        scopePrefix: 'openid',
        scopeDelimiter: ' ',
        display: 'popup',
        oauthType: '2.0',
        popupOptions: { width: 452, height: 633 },
        clientId: "440591203673-vlfttsppabo6ldkdleu08spg4jc7hmvm.apps.googleusercontent.com"
      });
    }
  ]);
