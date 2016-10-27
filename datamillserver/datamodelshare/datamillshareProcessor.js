var datamodelModel = require('../datamodel/datamodel');
var datamodelstructure = require('../datamodel/datamodelstructure');

var datamillshareProcessor = {

    getsharedDatamodel: function(email, sharedDataModelName, currentUser,
        successCallback, errorCallback) {
        //console.log("sharedDataModelName anish", sharedDataModelName);
        datamodelModel.findOne({
            "email": email,
            "name": sharedDataModelName
        }, function(err, srcDataModel) {
            if (err) {
                return errorCallback(500, err)
            }

            if (!srcDataModel) {
                return errorCallback(200, err)
            }

            //Found the original data model which was shared
            // console.log("Source data model to share: ", srcDataModel," currentUser is ", currentUser);

            var newDataModel = JSON.parse(JSON.stringify(srcDataModel));
            delete newDataModel['_id'];
            delete newDataModel['__v'];

            //Currently not supporting patterns while sharing, will do later
            newDataModel.patterns = [];

            newDataModel.email = currentUser;
            // console.log("New Data model: ", newDataModel);

            var destDataModel = new datamodelModel(newDataModel);
            destDataModel.save(function(err, copiedDataModel) {
                if (err) {
                    return errorCallback(500, err);
                }
                successCallback(201, copiedDataModel);
            })
        })
    }
}


module.exports = datamillshareProcessor;
