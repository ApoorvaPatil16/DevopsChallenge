angular.module('datamill')
.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('randomDomain',{
                   views: {
                        "appBar": {
                            templateUrl: "/home/templates/appBar.html",
                            controller: 'appBarController',
                            controllerAs: 'appBarCtrl'
                        },
                        "content": {
                            templateUrl: "/domain/randomdomain/templates/randomdomain.html",
                            controller: 'domainController'
                        },
                        "footer": {
                            templateUrl: "/home/templates/footer.html"
                        }
                    }
                });
        }
    ]);