var express = require('express');
var datamodel_router = express.Router();
var datamodelModel = require('./datamodel');
var datamodelstructure = require('./datamodelstructure');
var datamodelProcessor = require('./datamodelProcessor')

datamodel_router.get('/', function(req, res) {
    var query = {
        email: req.email
    };
    if (req.query && req.query.q) {
        query.name = req.query.q;
    }
    try {
        datamodelProcessor.datamodelfind(query, function(code, result) {
            return res.status(code).send(result);
        }, function(code, err) {
            return res.status(code).send({
                error: err
            })
        })
    } catch (exception) {
        return res.status(500).send({
            error: "Internal server error",
            'exception': exception
        });
    }
});

datamodel_router.get('/fulldatamodel/:datamodelname/', function(req, res) {
    try {
        datamodelProcessor.getfulldatamodel(req.email, req.params.datamodelname,
            function(code, result) {
                console.log("patternstructure", result);
                return res.status(code).send(result);
            },
            function(code, err) {
                return res.status(code).send({
                    error: err
                });
            })
    } catch (exception) {
        return res.status(500).send({
            error: "Internal server error"
        });
    }
})
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
    var query = {
        datamodelname: req.params.modelname,
        email: req.email,
        name: {
            $ne: req.params.modelname
        }
    }

    console.log("patternquery", query);
    try {
        datamodelProcessor.datamodelstructurefind(query, function(code,
            result) {
            return res.status(code).send(result);
        }, function(code, err) {
            return res.status(code).send({
                error: err
            });
        })
    } catch (exception) {
        return res.status(500).send({
            error: "Internal server error"
        });
    }
});
datamodel_router.get('/structure/:modelname', function(req, res) {
    var query = {
        datamodelname: req.params.modelname,
        email: req.email,
        name: req.params.modelname
    }

    try {
        datamodelProcessor.datamodelstructurefind(query, function(code,
            result) {
            return res.status(code).send(result[0]);
        }, function(code, err) {
            return res.status(code).send({
                error: err
            });
        })
    } catch (exception) {
        return res.status(500).send({
            error: "Internal server error"
        });
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
        datamodelProcessor.datamodelpost(req.email, req.body, function(
            code, result) {
            return res.status(code).send(result);
        }, function(code, err) {
            return res.status(code).send({
                error: err
            });
        })
    } catch (exception) {
        return res.status(500).send({
            error: "Internal server error"
        });
    }
})
datamodel_router.patch('/update/:datamodelname', function(req, res) {
    try {
        datamodelProcessor.datamodelpatch(req.email, req.params.datamodelname,
            req.body,
            function(code, result) {
                return res.status(code).send(result);
            },
            function(code, err) {
                return res.status(code).send({
                    error: err
                });
            });
    } catch (exception) {
        return res.status(500).send({
            "error": "Internal Server Error"
        });
    }
})
datamodel_router.delete('/delete/:datamodelname', function(req, res) {
    try {
        datamodelProcessor.datamodeldelete(req.email, req.params.datamodelname,
            function(code, result) {
                return res.status(code).send(result);
            },
            function(code, err) {
                return res.status(code).send({
                    error: err
                });
            });
    } catch (exception) {
        return res.status(500).send({
            error: "internal server error",
            exception: exception
        })
    }
})
module.exports = datamodel_router;
