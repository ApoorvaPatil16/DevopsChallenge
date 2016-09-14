var mongoose = require('mongoose');
var express = require('express');
var app = express();
var DomainLib = require('./domainlib');
var domainlib_router = express.Router();
var primitive = [{
  email: "admin",
  name: "String",
  description: "Base type String",
  type: "Primitive",
  base: "String",
  pattern: null,
  range: [{
    rangeOf: "words",
    min: null,
    max: null
  }, {
    rangeOf: "length",
    min: null,
    max: null
  }]
}, {
  email: "admin",
  name: "Number",
  description: "Base type Number",
  type: "Primitive",
  base: "Number",
  pattern: null,
  range: [{
    rangeOf: "value",
    min: null,
    max: null
  }]
}, {
  email: "admin",
  name: "Decimal",
  description: "Base type Decimal",
  type: "Primitive",
  base: "Decimal",
  pattern: null,
  range: [{
    rangeOf: "value",
    min: null,
    max: null
  }]
}, {
  email: "admin",
  name: "Date",
  description: "Base type Date",
  type: "Primitive",
  base: "Date",
  pattern: null,
  range: [{
    rangeOf: "value",
    min: null,
    max: null
  }]
}, {
  email: "admin",
  name: "Boolean",
  description: "Base type Boolean",
  type: "Primitive",
  base: "Boolean",
  pattern: null
}, {
  email: "admin",
  name: "Hexadecimal",
  description: "Base type Boolean",
  type: "Primitive",
  base: "Hexadecimal",
  pattern: null,
  range: [{
    rangeOf: "value",
    min: null,
    max: null
  }]
}, {
  email: "admin",
  name: "TimeStamp",
  description: "Base type TimeStamp",
  type: "Primitive",
  base: "TimeStamp",
  pattern: null,
  range: [{
    rangeOf: "value",
    min: null,
    max: null
  }]
}]
DomainLib.insertMany(primitive, function(err, res) {
  console.log("err", err);
  console.log("suc", res);

});
domainlib_router.post('/', function(req, res) {
  console.log(req.body);
  req.body.email = req.email;
  var domainData = new DomainLib(req.body);
  domainData.save(function(err, result) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    console.log(result);
    return res.send(result);

  })
});

domainlib_router.get('/:type', function(req, res) {
  if (req.params.type == 'all') {
    DomainLib.find({ $or: [{ email: 'admin' }, { email: req.email }] }).exec(function(err, domainLib) {
      if (err) {
        return res.send(err);
      }
      return res.send(domainLib);
    })
  }
  if (req.params.type == 'primitive') {
    DomainLib.find({ type: 'Primitive' }).exec(function(err, domainLib) {
      if (err) {
        return res.send(err);
      }
      return res.send(domainLib);
    })
  }
  if (req.params.type == 'notprimitive') {
    if (req.query._start) {
      DomainLib.find({ email: req.email }).skip(+req.query._start).limit(+req.query._limit).exec(function(err, domainLib) {
        if (err) {
          return res.send(err);
        }
        return res.send(domainLib);
      })
    }
    if (req.query.q) {
      DomainLib.find({ name: req.query.q, email: req.email }, function(err, success) {
        if (err) {
          return res.send(err);
        }
        console.log(success);
        return res.send(success);
      })
    }
  }
});
domainlib_router.patch('/updateData', function(req, res) {
  req.body.email = req.email;
  DomainLib.findOneAndUpdate({ name: req.body.name, email: req.email }, req.body, function(err, docs) {
    if (err) {
      console.log(err);
    }
    return res.send(docs);
  })
});
module.exports = domainlib_router;
