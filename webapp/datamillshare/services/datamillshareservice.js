angular.module('datamill')
    .factory('datamillshareservice', ['$http', '$location', '$q',

        function($http, $location, $q) {
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
<<<<<<< HEAD
                    shareURL += '&e=' + entityType;
                    shareURL += '&o=' + ownerName;
                    shareURL += '&n=' + entityName;

=======
                    shareURL += ';e=' + entityType;
                    shareURL += ';o=' + ownerName;
                    shareURL += ';n=' + entityName;
>>>>>>> d637e05e6388b87abec11e3d53b5d77adfbc2d7d
                    return (shareURL);
                },

                copySharedDataModel: function(copyToUser, sharedByOwner, sharedDataModelName) {
                    //Make a API call to copy the Data model from sharedByOwner to copyToUser
                    return $q(function(resolve, reject) {
                        console.log("datamodel which we have to share=", sharedDataModelName);
                        console.log("datamodel which is shared by =", sharedByOwner);
                        console.log("datamodel which is used by =", copyToUser);


                        $http.get("/shareddatamodel/sharedmodel/" + sharedDataModelName + "/" + sharedByOwner + "/" + copyToUser).then(function(res) {            
                            resolve(res.data);        
                        }, function(res) {
                            reject("Unable to connect server");
                        });
                    });

                    // return $http.post();
                },
                // postcopySharedDataModel: function() {}
            }
        }
    ]);
