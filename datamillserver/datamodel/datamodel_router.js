var express = require('express');
var datamodel_router = express.Router();
var datamodelModel = require('./datamodel');
var datamodelstructure = require('./datamodelstructure');
var datamodelProcessor = require('./datamodelProcessor')

datamodel_router.get('/', function(req, res) {
  var query = { email: req.email };
  if (req.query && req.query.q) {
    query.name = req.query.q;
  }
  try {
    datamodelProcessor.datamodelfind(query, function(result) {
      return res.status(200).send(result);
    }, function(err) {
      return res.status(500).send({ error: err })
    })
  } catch (exception) {
    return res.status(500).send({ error: "Internal server error", 'exception': exception });
  }
});
datamodel_router.get('/transporttype', function(req, res) {
  var transporttype = [{
    "id": 1,
    "name": "Mongo DB"
  }, {
    "id": 2,
    "name": "Redis"
  }, {
    "id": 3,
    "name": "Redis MQ"
  }, {
    "id": 4,
    "name": "Kafka"
  }, {
    "id": 5,
    "name": "Websocket"
  }]
  return res.status(200).send(transporttype);
})
datamodel_router.get('/patterns/:modelname', function(req, res) {
  var query = { datamodelname: req.params.modelname, email: req.email, name: { $ne: req.params.modelname } }
  try {
    datamodelProcessor.datamodelstructurefind(query, function(result) {
      return res.status(200).send(result);
    }, function(err) {
      return res.status(500).send({ error: err });
    })
  } catch (exception) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
datamodel_router.get('/structure/:modelname', function(req, res) {
  var query = { datamodelname: req.params.modelname, email: req.email, name: req.params.modelname }
  try {
    datamodelProcessor.datamodelstructurefind(query, function(result) {
      return res.status(200).send(result);
    }, function(err) {
      return res.status(500).send({ error: err });
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
    datamodelModel.find({ name: req.body.name, email: req.email }, function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send({ error: err });
      }
      if (result.length == 0) {
        req.body.structname = req.body.name;
        req.body.email = req.email;
        var datamodeldata = new datamodelModel(req.body);
        var docs = [];
        docs.push({ name: req.body.name, email: req.email, datamodelname: req.body.name, attributes: req.body.attributes })
        if (req.body.patternstruct) {
          req.body.patternstruct.forEach(function(pattern) {
            docs.push({ name: pattern.name, email: req.email, datamodelname: req.body.name, attributes: pattern.attributes })
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
    datamodelstructure.remove({ email: req.email, datamodelname: req.params.datamodelname }, function(err) {
      if (err) {
        return res.status(500).send({ error: "unable to remove structures/patterns" });
      }
      req.body.structname = req.body.name;
      req.body.email = req.email;
      var docs = [];
      docs.push({ name: req.body.name, email: req.email, datamodelname: req.body.name, attributes: req.body.attributes })
      if (req.body.patternstruct) {
        req.body.patternstruct.forEach(function(pattern) {
          docs.push({ name: pattern.name, email: req.email, datamodelname: req.body.name, attributes: pattern.attributes })
        });
      }
      datamodelstructure.insertMany(docs, function(err, docs) {
        if (err) {
          return res.status(500).send({ error: "insert many failed" });
        } else {
          datamodelModel.findOneAndUpdate({ name: req.params.datamodelname, email: req.email }, req.body, function(err, doc) {
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
datamodel_router.delete('/delete/:datamodelname', function(req, res) {
  try {
    datamodelstructure.remove({ email: req.email, datamodelname: req.params.datamodelname }, function(err) {
      if (err) {
        return res.status(500).send({ error: "unable to remove structures/patterns" });
      }
      datamodelModel.remove({ name: req.params.datamodelname, email: req.email }, function(err, doc) {
        if (err) {
          return res.status(500).send({ "error": err });
        }
        return res.status(200).send(doc);
      });
    });
  } catch (exception) {
    return res.status(500).send({ error: "internal server error", exception: exception })
  }
})
module.exports = datamodel_router;
