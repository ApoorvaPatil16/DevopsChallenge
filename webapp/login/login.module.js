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
      $authProvider.google({
        url: '/auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
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
  ])
