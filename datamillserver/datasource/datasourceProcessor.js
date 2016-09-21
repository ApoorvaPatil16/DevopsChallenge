var mongoose = require('mongoose');
var datasourceSchema = require('./datasourceSchema');
var importsourceSchema = require('./importdataSchema');
function postDataSource(req, successcallback, errorcallback) {
    console.log("inside postDataSource");
    var add = {
        name: req.name,
        tags: req.tags,
        description: req.description,
        email: req.email
    }
    var savedata = {
        email: req.email,
        "sourcename": req.name,
        "data": req.json
    }
    var dataSourceData = new datasourceSchema(add);
    var postdata = new importsourceSchema(savedata);
    dataSourceData.save(function(err, result) {
        if (err) {
            return errorcallback(err);
        }
        console.log(result);
        postdata.save(function(err, impresult) {
            if (err) {
                return errorcallback(err);
            }
            console.log(impresult);
            return successcallback(result);
        })
    });
}

function getDataSource(req, successcallback, errorcallback){
   datasourceSchema.find({ email: req.email }, function(err, result) {
        if (err) return errorcallback(err);
        return successcallback(result);

    });
}

function patchDataSource(req, successcallback, errorcallback){
        console.log("inside patch datasource");
datasourceSchema.findOneAndUpdate({ name: req.name, email: req.email }, req, function(err, doc) {
        if (err) {
            return errorcallback(err);
        } else {
        	console.log("near to success");
            return successcallback(doc);
        }
    });
}

module.exports = {
    postDataSource: postDataSource,
    getDataSource:getDataSource,
    patchDataSource:patchDataSource
};
