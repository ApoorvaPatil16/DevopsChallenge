angular.module('datamill')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider.state('datamodel', {
                views: {
                    "appBar": {
                        templateUrl: "/home/templates/appBar.html",
                        controller: 'appBarController',
                        controllerAs: 'appBarCtrl'
                    },
                    "content": {
                        templateUrl: "/datamodel/templates/datamodel.html",
                        controller: 'datamodelController',
                    },
                    "footer": {
                        templateUrl: "/home/templates/footer.html"
                    }
                }
            });
        }
    ]);
