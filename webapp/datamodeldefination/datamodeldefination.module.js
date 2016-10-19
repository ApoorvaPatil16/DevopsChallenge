angular.module('datamill')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider.state('datamill.datamodeldefination', {
                url: '/datamodeldefination/:mode/:datamodelname',
                views: {
                    "content@": {
                        templateUrl: "/datamodeldefination/templates/datamodeldefination.html",
                        controller: 'datamodeldefinationController'
                    }
                },
                params: {
                    mode: "create",
                    datamodelname: undefined,
                    dataModel: {
                        "name": '',
                        "description": '',
                        "attributes": [],
                        "patterns": [],
                        "patternstruct": [],
                        "username": "vishal"
                    }
                }
            });
        }
    ]);
