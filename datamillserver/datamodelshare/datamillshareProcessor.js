var datamodelModel = require('../datamodel/datamodel');
var datamodelstructure = require('../datamodel/datamodelstructure');

var datamillshareProcessor = {

    getsharedDatamodel: function(email, sharedDataModelName, currentUser, successCallback, errorCallback) {
        //console.log("sharedDataModelName anish", sharedDataModelName);
        datamodelModel.find({ "email": email, "name": sharedDataModelName }, function(err, result) {
            if (err) {
                return errorCallback(500, err)
            }
            console.log("Inside processor shared model name : " + sharedDataModelName);
            console.log("Inside processor shares By : " + email);
            console.log("Inside processor currentUser By : " + currentUser);
            console.log(result);

            var doc = Object.assign({}, result[0]['_doc']);
            var copysharedmobj = Object.assign({}, result[0]['_copysharedobj']);
            datamodelstructure.find({ email: email, datamodelname: sharedDataModelName, name: sharedDataModelName }, function(err, result1) {
                console.log("Inside datamodelstructure***********", email);
                if (err) {
                    return errorCallback(500, err);
                }

                if (result1[0] && result1[0].attributes) doc['attributes'] = Object.assign([], result1[0]['_doc']['attributes'])
                datamodelstructure.find({ email: email, datamodelname: sharedDataModelName, name: { $ne: sharedDataModelName } }, function(err, result2) {
                    if (err) {
                        return errorCallback(500, err);
                    }
                    doc["patternstruct"] = Object.assign([], result2);
                    copysharedmobj['attributes'] = doc["attributes"];
                    copysharedmobj['patternstruct'] = doc["patternstruct"];
                    console.log("datamillshareProcessor last copied patternstruc result******", copysharedmobj["patternstruct"]);
                    console.log("datamillshareProcessor last copied attributes result******", copysharedmobj["attributes"]);
                    console.log("datamillshareProcessor original result******", doc);
                    copysharedmobj.name = doc.name;
                    copysharedmobj.datamodelname = sharedDataModelName;


                    copysharedmobj.description = doc.description;
                    copysharedmobj.datafeed = doc.datafeed;
                    copysharedmobj.download = doc.download;
                    copysharedmobj.format = doc.format;
                    copysharedmobj.ispublic = doc.ispublic;
                    copysharedmobj.status = doc.status;
                    copysharedmobj.updateon = doc.updateon;
                    copysharedmobj.delivery = doc.delivery;
                    copysharedmobj.email = currentUser;

                    //copysharedmobj.email = auth.getPayload().email;
                    console.log('------------------------------');
                    console.log(copysharedmobj);
                    console.log("current user ******", currentUser);
                    var saveSharedCopy = new datamodelstructure(copysharedmobj);
                    saveSharedCopy.save(function(err, result) {
                        if (err) {
                            console.log(err);
                        }
                        console.log(result);
                        return successCallback(200, copysharedmobj);
                    })

                })


            })
        })
    }
}


module.exports = datamillshareProcessor;
