angular.module('datamill')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider.state('datamill.datamillshare', {
                url: "/datamillshare",
                params: {
                    d: null,
                    e: null,
                    o: null,
                    n: null,
                    mode: "edit",
                    datamodelname: undefined,
                    dataModel: {
                        "name": '',
                        "description": '',
                        "attributes": [],
                        "patterns": [],
                        "patternstruct": [],
                        "username": "vishal"
                    }
                },
                views: {
                    "content@": {
                        templateUrl: "/datamillshare/templates/datamillshare.html",
                        controller: 'datamillshareCtrl'
                    }
                }
            });
            $locationProvider.html5Mode(false);
        }
    ]);
