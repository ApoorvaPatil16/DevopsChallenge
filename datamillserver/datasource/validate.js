var express = require('express');
var mongoose=require('mongoose');
var datasourceSchema = require('./datasourceSchema');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
var validate_router = express.Router();
validate_router.get('/:name', function(req, res) {
    datasourceSchema.find({ 'name': req.params.name }, function(err, docs) {
        if (err) {
            console.log("error in verifying of same document exists or not");
            res.send("error in verifying of same document exists or not");
        }
        if (docs.length == 0) {
            res.send("false");
        } else {
            res.send("true");
        }
    });
});
module.exports = validate_router;
