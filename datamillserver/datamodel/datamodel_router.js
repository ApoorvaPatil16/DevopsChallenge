var express = require('express');
var mongoose = require('mongoose');
var datamodel_router = express.Router();
var datamodelModel = require('./datamodel');
var datamodelstructure = require('./datamodelstructure');

mongoose.connect('mongodb://localhost:27017/datamillserver');
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
datamodel_router.get('/patterns/:modelname', function(req, res) {
  try {
    datamodelstructure.find({ datamodelname: req.params.modelname, username: req.username, name: { $ne: req.params.modelname } }, function(err, result) {
      if (err) {
        return res.status(500).send({ error: err });
      }
      return res.status(200).send(result);
    })
  } catch (exception) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
datamodel_router.get('/structure/:modelname', function(req, res) {
  req.username = "vishal";
  try {
    datamodelstructure.find({ datamodelname: req.params.modelname, username: req.username, name: req.params.modelname }, function(err, result) {
      if (err) {
        return res.status(500).send({ error: err });
      }
      console.log("result", result);
      return res.status(200).send(result[0]);
    })
  } catch (exception) {
    return res.status(500).send({ error: "Internal server error" });
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
        req.body.structname = req.body.name;
        var datamodeldata = new datamodelModel(req.body);
        var docs = [];
        docs.push({ name: req.body.name, username: req.body.username, datamodelname: req.body.name, attributes: req.body.attributes })
        if (req.body.patternstruct) {
          req.body.patternstruct.forEach(function(pattern) {
            docs.push({ name: pattern.name, username: req.body.username, datamodelname: req.body.name, attributes: pattern.attributes })
          });
        }
        datamodelstructure.insertMany(docs, function(err, docs) {
          if (err) {
            return res.status(500).send({ error: "insert many failed" });
          } else {
            datamodeldata.save(function(err, result) {
              if (err) {
                console.log(err);
                return res.status(500).send({ error: err });
              }
              return res.status(201).send(result);
            })
          }
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
    datamodelstructure.remove({ username: req.body.username, datamodelname: req.params.datamodelname }, function(err) {
      if (err) {
        return res.status(500).send({ error: "unable to remove structures/patterns" });
      }
      req.body.structname = req.body.name;
      var docs = [];
      docs.push({ name: req.body.name, username: req.body.username, datamodelname: req.body.name, attributes: req.body.attributes })
      if (req.body.patternstruct) {
        req.body.patternstruct.forEach(function(pattern) {
          docs.push({ name: pattern.name, username: req.body.username, datamodelname: req.body.name, attributes: pattern.attributes })
        });
      }
      datamodelstructure.insertMany(docs, function(err, docs) {
        if (err) {
          return res.status(500).send({ error: "insert many failed" });
        } else {
          datamodelModel.findOneAndUpdate({ name: req.params.datamodelname, username: req.body.username }, req.body, function(err, doc) {
            if (err) {
              return res.status(500).send({ "error": err });
            }
            console.log(doc);
            return res.status(201).send(doc);
          });
        }
      })
    });
  } catch (exception) {
    return res.status(500).send({ "error": "Internal Server Error" });
  }
})
module.exports = datamodel_router;
