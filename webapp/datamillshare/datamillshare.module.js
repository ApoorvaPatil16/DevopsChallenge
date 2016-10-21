angular.module('datamill')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider.state('datamill.datamillshare', {
                url: "/datamillshare",
                views: {
                    "content@": {
                        templateUrl: "/datamillshare/templates/datamillshare.html",
                        controller: 'datamillshareCtrl'
                    }
                }
            });
            $locationProvider.html5Mode(true);
        }
    ]);
