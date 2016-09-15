angular.module('datamill')
    .factory('listdataService', function($http, $log) {
        return {
            getdatasources: function() {
                return $http.get('/datasources')
                    .then(function(response) {
                        // $log.info(response);
                        return response.data;
                    });
            },
            isnamepresent: function(data) {
                return $http.get('/validatename/'+data.name)
                    .then(function(response) {
                        // $log.info(response);
                        return response.data;
                    });
            }
        };
    });
