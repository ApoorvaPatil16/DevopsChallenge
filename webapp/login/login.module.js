angular.module('datamill')
  .config(['$stateProvider', '$urlRouterProvider', '$authProvider',

    function($stateProvider, $urlRouterProvider, $authProvider) {
      $stateProvider.state('datamill.login', {
        url: "/login",
        views: {
          "content@": {
            templateUrl: "/login/templates/signin.html",
            controller: 'loginCtrl'
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
      $authProvider.twitter({
        url: '/auth/twitter',
        authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
        redirectUri: window.location.origin,
        oauthType: '1.0',
        popupOptions: { width: 495, height: 645 }
      });
    }
  ])
