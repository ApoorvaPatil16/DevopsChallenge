var datamodelModel = require('./datamodel');
var datamodelstructure = require('./datamodelstructure');

var datamodelProcessor = {
  datamodelfind: function(query, successCallback, errorCallback) {
    datamodelModel.find(query, function(err, result) {
      if (err) {
        return errorCallback(500, err);
      }
      successCallback(200, result);
    })
  },
  datamodelstructurefind: function(query, successCallback, errorCallback) {
    console.log("query is:", query)
    datamodelstructure.find(query, function(err, result) {
      if (err) {
        return errorCallback(500, err);
      }
      console.log(result)
      return successCallback(200, result);
    })
  },
  datamodelpatch: function(email, datamodelname, object, successCallback, errorCallback) {
    datamodelstructure.remove({ email: email, datamodelname: datamodelname }, function(err) {
      if (err) {
        return errorCallback(500, "unable to remove structures/patterns");
      }
      object.structname = object.name;
      object.email = email;
      var docs = [];
      docs.push({ name: object.name, email: email, datamodelname: object.name, attributes: object.attributes })
      if (object.patternstruct) {
        object.patternstruct.forEach(function(pattern) {
          docs.push({ name: pattern.name, email: email, datamodelname: object.name, attributes: pattern.attributes })
        });
      }
      datamodelstructure.insertMany(docs, function(err, docs) {
        if (err) {
          return errorCallback(500, "insert many failed");
        } else {
          datamodelModel.findOneAndUpdate({ name: datamodelname, email: email }, object, function(err, doc) {
            if (err) {
              return errorCallback(500, err);
            }
            console.log(doc);
            return successCallback(201, doc);
          });
        }
      })
    });

  },
  datamodelpost: function(email, object, successCallback, errorCallback) {
    datamodelModel.find({ name: object.name, email: email }, function(err, result) {
      if (err) {
        console.log(err);
        return errorCallback(500, err);
      }
      if (result.length == 0) {
        object.structname = object.name;
        object.email = email;
        var datamodeldata = new datamodelModel(object);
        var docs = [];
        docs.push({ name: object.name, email: email, datamodelname: object.name, attributes: object.attributes })
        if (object.patternstruct) {
          object.patternstruct.forEach(function(pattern) {
            docs.push({ name: pattern.name, email: email, datamodelname: object.name, attributes: pattern.attributes })
          });
        }
        datamodelstructure.insertMany(docs, function(err, docs) {
          if (err) {
            return errorCallback(500, "insert many failed");
          } else {
            datamodeldata.save(function(err, result) {
              if (err) {
                console.log(err);
                return errorCallback(500, err);
              }
              return successCallback(201, result);
            })
          }
        })
      } else {
        return errorCallback(409, "already exist the data model");
      }
    })

  },
  datamodeldelete: function(email, datamodelname, successCallback, errorCallback) {
    datamodelstructure.remove({ email: email, datamodelname: datamodelname }, function(err) {
      if (err) {
        return errorCallback(500, "unable to remove structures/patterns");
      }
      datamodelModel.remove({ name: datamodelname, email: email }, function(err, doc) {
        if (err) {
          return errorCallback(500, err);
        }
        return successCallback(200, doc);
      });
    });
  }
}

module.exports = datamodelProcessor
