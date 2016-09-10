var mongoose = require('mongoose');
var express = require('express');
var app = express();
var DomainLib = require('./domainlib');
var domainlib_router = express.Router();
mongoose.connect('mongodb://localhost:27018/datamillserver');
domainlib_router.post('/addData', function(req, res) {
  console.log(req.body);
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
domainlib_router.get('/getData', function(req, res) {
  if (req.query._start) {
    DomainLib.find().skip(+req.query._start).limit(+req.query._limit).exec(function(err, domainLib) {
      if (err) {
        return res.send(err);
      }
      return res.send(domainLib);
    })
  }
  if (req.query.q) {
    DomainLib.find({ name: req.query.q }, function(err, success) {
      if (err) {
        return res.send(err);
      }
      console.log(success);
      return res.send(success);
    })
  }
});
domainlib_router.patch('/updateData', function(req, res) {
  DomainLib.findOneAndUpdate({ name: req.body.name }, req.body, function(err, docs) {
    if (err) {
      console.log(err);
    }
    return res.send(docs);
  })
});
module.exports = domainlib_router;
