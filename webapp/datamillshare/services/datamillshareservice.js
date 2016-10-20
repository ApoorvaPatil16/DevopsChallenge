angular.module('datamill')
    .factory('datamillshareservice', function($http, $q) {
        return {

            constructShareURL: function(datamodel, entityType, ownerName, entityName) {
                return $q(function(resolve, reject) {

                    var shareURL = 'https://datamill.stackroute.in?';
                    //var hash = makeHash(secret, entityType, ownername, entityName);
                    //shareURL += '?h=' + hash;

                    shareURL += '&e=' + datamodel.entityType;
                    shareURL += '&o=' + datamodel.ownerName;
                    shareURL += '&n=' + datamodel.entityName;
                })

            }
        }
    });
