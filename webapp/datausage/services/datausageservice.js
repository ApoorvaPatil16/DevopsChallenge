angular.module('datamill')
    .factory('datausageservice', function($http) {
        return {
            getUsers: function() {
                console.log('inside datausageservice getuser method');
                return $http.get('/stats/users').then(function(res) {
                    // console.log("response", res.data);
                    return res.data;

                });
            },
            getDatamodels: function() {
                return $http.get('/stats/datamodels').then(function(res) {
                    // console.log("response", res.data);
                    return res.data;
                });
            },
            getDatasource: function() {
                return $http.get('/stats/datasources').then(function(res) {
                    // console.log("response", res.data);
                    return res.data;
                });
            },
            getDatadomains: function() {
                return $http.get('/stats/datadomains').then(function(res) {
                    // console.log("response", res.data);
                    return res.data;
                });
            }
        }
    })
