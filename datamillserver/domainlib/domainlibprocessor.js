var mongoose = require('mongoose');
var DomainLib = require('./domainlib');

function createNewDomain(data, successCallback, errorCallback) {
  var domainData = new DomainLib(data);
  domainData.save(function(err, result) {
    if (err) {
      return errorCallback(err);
    }
    return successCallback(result);
  })
};

function updateDomain(req, successCallback, errorCallback) {
  DomainLib.findOneAndUpdate({ name: req.body.name, email: req.email }, req.body, function(err, docs) {
    if (err) {
      return errorCallback(err);
    }
    return successCallback(docs);
  })
};

function getDomain(req, successCallback, errorCallback) {
  if (req.params.type == 'all') {
    DomainLib.find({ $or: [{ email: 'admin' }, { email: req.email }] }).exec(function(err, domainLib) {
      if (err) {
        return errorCallback(err);
      }
      return successCallback(domainLib);
    })
  }
  if (req.params.type == 'primitive') {
    DomainLib.find({ type: 'Primitive' }).exec(function(err, domainLib) {
      if (err) {
        return errorCallback(err);
      }
      return successCallback(domainLib);
    })
  }
  if (req.params.type == 'notprimitive') {
    if (req.query._start) {
      DomainLib.find({ email: req.email }).skip(+req.query._start).limit(+req.query._limit).exec(function(err, domainLib) {
        if (err) {
          return errorCallback(err);
        }
        return successCallback(domainLib);
      })
    }
    if (req.query.q) {
      DomainLib.find({ name: req.query.q, email: req.email }, function(err, success) {
        if (err) {
          return errorCallback(err);
        }
        return successCallback(success);
      })
    }
  }
};
module.exports = {
  createNewDomain: createNewDomain,
  getDomain: getDomain,
  updateDomain: updateDomain
};
