var express = require('express');
var mongoose = require('mongoose');
var datamodel_router = express.Router();
var datamodelModel = require('./datamodel');
datamodel_router.get('/', function(req, res) {
  if (req.query && req.query.q) {
    try {
      datamodelModel.find({ name: req.query.q }, function(err, result) {
        if (err) {
          return res.status(500).send({ error: err });
        }
        return res.send(result);
      })
    } catch (exception) {
      return res.status(500).send({ 'error': "internal server Error" })
    }
  } else {
    try {
      datamodelModel.find(function(err, result) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send(result);
      })
    } catch (exception) {
      return res.status(500).send({ error: "Internal server error" });
    }
  }
});
datamodel_router.get('/conf', function(req, res) {
  var data = {
    "heading": "Data Model Defination",
    "inputFormat": {
      "form": {
        "label": "Form",
        "tabid": "formtab"
      },
      "node": {
        "label": "Node",
        "tabid": "nodetab"
      }
    },
    "inputs": {
      "title": "string",
      "description": "string",
      "visibility": [
        "public",
        "private",
        "shared"
      ],
      "attribute": {
        "type": [
          "domain",
          "schema"
        ]
      },
      "deliverytype": [{
        "type": "Download",
        "value": "download",
        "state": "download",
        "linkname": "Download Option"
      }, {
        "type": "Feed",
        "value": "feed",
        "state": "datafeed",
        "linkname": "Feed Option"
      }]
    }
  };
  return res.status(200).send(data);
})
datamodel_router.post('/', function(req, res) {
  try {
    datamodelModel.find({ name: req.body.name }, function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send({ error: err });
      }
      if (result.length == 0) {
        var datamodeldata = new datamodelModel(req.body);
        datamodeldata.save(function(err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send({ error: err });
          }
          return res.status(201).send(result);
        })
      } else {
        return res.status(409).send({ error: "already exist the data model" })
      }
    })
  } catch (exception) {
    return res.status(500).send({ error: "Internal server error" });
  }
})
datamodel_router.patch('/update/:datamodelname', function(req, res) {
  try {
    datamodelModel.findOneAndUpdate({ name: req.params.datamodelname }, req.body, function(err, doc) {
      if (err) {
        return res.status(500).send({ "error": err });
      }
      console.log(doc);
      return res.status(201).send(doc);
    })
  } catch (exception) {
    return res.status(500).send({ "error": "Internal Server Error" });
  }
})
module.exports = datamodel_router;
