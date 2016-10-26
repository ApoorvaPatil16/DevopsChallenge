var datauser = require('../users/userprofile');
var datamodels = require('../datamodel/datamodel');
var datasources = require('../datasource/datasourceSchema');
var datadomains = require('../domainlib/domainlib');

getUsers = function(req, successCB, errorCB) {
    console.log("users=", req);
    datauser.count({

        },
        function(error, result) {
            if (error) {
                errorCB(error);

            }
            console.log(result);
            successCB(result);

        });
}
getDatamodels = function(req, successCB, errorCB) {
    datamodels.count({}, function(error, result) {
        if (error) {
            errorCB(error);
        }
        successCB(result);
    });
}
getDatasources = function(req, successCB, errorCB) {
    datasources.count({}, function(error, result) {
        if (error) {
            errorCB(error);
        }
        successCB(result);
    });
}
getDatadomains = function(req, successCB, errorCB) {
    datadomains.count({}, function(error, result) {
        if (error) {
            errorCB(error);
        }
        successCB(result);
    });
}
module.exports = {
    getUsers: getUsers,
    getDatamodels: getDatamodels,
    getDatasources: getDatasources,
    getDatadomains: getDatadomains

};
