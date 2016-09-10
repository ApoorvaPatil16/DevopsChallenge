var express = require('express');
var mongoose = require('mongoose');
var datamodel_router = express.Router();
var datamodelModel = require('./datamodel');
mongoose.connect('mongodb://localhost:27017/datamillserver');
datamodel_router.get('/', function(req, res) {
  if (req.query.q) {
    datamodelModel.find({ title: req.query.q }, function(err, result) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(result);
    })
  } else {

    datamodelModel.find(function(err, result) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(result);
    })
  }
});
datamodel_router.post('/', function(req, res) {
  datamodelModel.find({ name: req.body.name }, function(err, result) {
    if (err) {
      res.status(500).send(err);
    }
    if (result.length == 0) {
      var datamodeldata = new datamodelModel(req.body);
      datamodeldata.save(function(err, result) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.send(result);
      })
    } else {
      return res.status(409).send({ error: "alerady exist the data domain" })
    }
  })
})
datamodel_router.patch('/update/:datamodelname', function(req, res) {
  datamodelModel.findOneAndUpdate({ name: req.params.datamodelname }, req.body, function(err, doc) {
    if (err) {
      return res.status(500).send({ "error": err });
    }
    return res.send(doc);
  })
})
module.exports = datamodel_router;
