angular.module('datamill')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider.state('datamill.datausage', {
                url: "/datausage",
                views: {
                    "content@": {
                        templateUrl: "/datausage/templates/datausage.html",
                        controller: 'datausageCtrl'
                    }
                }
            });
        }
    ]);
