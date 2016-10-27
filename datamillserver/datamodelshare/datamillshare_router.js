var express = require('express');
var datamillshareProcessor = require('./datamillshareProcessor');
var datashare_router = express.Router();


datashare_router.get('/sharedmodel/:sharedDataModelName/:email/:currentUser',
    function(req, res) {
        console.log("sharedDataModelName", req.params.currentUser);
        try {
            datamillshareProcessor.getsharedDatamodel(req.params.email, req.params.sharedDataModelName,
                req.params.currentUser,
                function(code, result) {
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

module.exports = datashare_router;
