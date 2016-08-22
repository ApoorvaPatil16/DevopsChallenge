angular.module('datamill')
.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('randomDomain',{
                   views: {
                        "appBar": {
                            templateUrl: "/home/templates/appBar.html",
                            controller: 'appBarCtrl',
                            controllerAs: 'appbarCtrl'
                        },
                        "content": {
                            templateUrl: "/domainlib/randomdomainlib/templates/randomdomain.html",
                            controller: 'randomDomainCtrl'
                        },
                        "footer": {
                            templateUrl: "/home/templates/footer.html"
                        }
                    }
                });
        }
    ]);