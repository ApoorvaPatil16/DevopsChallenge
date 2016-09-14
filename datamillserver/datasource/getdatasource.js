var mongoose = require('mongoose');
var express = require('express');
var mongoose=require('mongoose');
var datasourceSchema = require('./datasourceSchema');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
var datasource_router = express.Router();
datasource_router.get('/', function(req, res) {
    mongoose.connect('mongodb://localhost:27017/datamillserver');
    datasourceSchema.find(function(err, result) {
        mongoose.connection.close();
        if (err) return console.error(err);
        return res.send(result);

    });
});
module.exports = datasource_router;
