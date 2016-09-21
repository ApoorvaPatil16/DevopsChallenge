var datamodelModel = require('./datamodel');
var datamodelstructure = require('./datamodelstructure');

var datamodelProcessor = {
  datamodelfind: function(query, successCallback, errorCallback) {
    datamodelModel.find(query, function(err, result) {
      if (err) {
        return errorCallback(err);
      }
      successCallback(result);
    })
  },
  datamodelstructurefind: function(query, successCallback, errorCallback) {
    datamodelstructure.find(query, function(err, result) {
      if (err) {
        return errorCallback(err);
      }
      return successCallback(result);
    })
  },
  datamodelpatch: function() {

  },
  datamodelpost: function() {

  },
  datamodeldelete: function() {

  }
}

module.exports = datamodelProcessor
