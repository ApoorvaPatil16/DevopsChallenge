angular.module('datamill')
    .factory('datamillshareservice', ['$http', '$location',
        function($http, $location) {
            return {

                isSharedURLAccess: function() {
                    var queryStringParams = $location.search();

                    if (queryStringParams['e'] && queryStringParams['o'] && queryStringParams['n'] && queryStringParams['d']) {
                        return queryStringParams;
                    }

                    return false;
                },


                constructShareURL: function(entityType, ownerName, entityName) {
                    //FORMAT of the URL is 
                    //   http://<datamill domain name>?e=<entity name>&o=<owner name>&n=<name of the entity instance>
                    //
                    //   Eg: http://datamill.com?d=1477114395&e=dm&o=ramgraospeeking@gmail.com&n=Name
                    var shareURL = 'http://datamill.stackroute.in?';
                    // var hash = makeHash(secret, entityType, ownerName, entityName);
                    // shareURL += '?h=' + hash;

                    const dateTime = Date.now();
                    const timestamp = Math.floor(dateTime / 1000);

                    shareURL += 'd=' + timestamp;
                    shareURL += ';e=' + entityType;
                    shareURL += ';o=' + ownerName;
                    shareURL += ';n=' + entityName;
                    return (shareURL);
                },

                copySharedDataModel: function(copyToUser, sharedByOwner, sharedDataModelName) {
                    //Make a API call to copy the Data model from sharedByOwner to copyToUser
                    // return $http.post();
                }
            }
        }
    ]);
