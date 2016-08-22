angular.module('datamill')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider.state('datafeed', {
                views: {
                    "appBar": {
                        templateUrl: "/home/templates/appBar.html",
                        controller: 'appBarCtrl',
                        controllerAs: 'appbarCtrl'
                    },
                    "content": {
                        templateUrl: "/datafeed/templates/datafeedsimulation.html",
                        // controller: 'contentController'
                    },
                    "footer": {
                        templateUrl: "/home/templates/footer.html"
                    }
                }
            });
        }
    ]);
