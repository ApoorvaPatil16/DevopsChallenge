var mongoose = require('mongoose');
var express = require('express');
var datasourceProcessor = require('./datasourceProcessor');
var app = express();
var bodyParser = require('body-parser');
var datasourceSchema = require('./datasourceSchema');
var importsourceSchema = require('./importdataSchema');
var datasource_router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
datasource_router.post('/', function(req, res) {
    try {
        req.body.email = req.email;
        datasourceProcessor.postDataSource(req.body, function(success) {
            res.status(201).json(success);
        }, function(errorcallback) {
            console.log("error occurred in errorcallback from posting datasource");
            res.status(501).json({ error: "Internal Server Error" });
        });
    } catch (error) {
        console.log("error occurred in posting data source");
        res.status(500).json({ error: "Internal Error Recorded" });
    }
});
datasource_router.patch('/', function(req, res) {
    try {
        req.body.email = req.email;
        datasourceProcessor.patchDataSource(req.body, function(success) {
            res.status(201).json(success);
        }, function(errorcallback) {
            console.log("error occurred in errorcallback from patching datasource");
            res.status(501).json({ error: "Internal Server Error in patching" });
        });
    } catch (error) {
        console.log("error occurred in patching data source");
        res.status(500).json({ error: "Internal Error Recorded" });
    }
});
datasource_router.get('/', function(req, res) {
    try {
        req.body.email = req.email;
        datasourceProcessor.getDataSource(req.body, function(success) {
            res.status(201).json(success);
        }, function(errorcallback) {
            console.log("error occurred in errorcallback from listing datasource");
            res.status(501).json({ error: "Internal Server Error in listing" });
        });
    } catch (error) {
        console.log("error occurred in listing data source");
        res.status(500).json({ error: "Internal Error Recorded" });
    }
});
// datasource_router.get('/email', function(req, res) {
//     console.log("getting the data", email);
//     try {
//         datasourceSchema.find({ email: req.email }, function(err, result) {
//             if (err) return errorcallback(err);
//             return successcallback(result);
//             console.log("email of user is =", email);
//         });

//     } catch (err) {
//         console.log("error", err);
//     }

// });
module.exports = datasource_router;
