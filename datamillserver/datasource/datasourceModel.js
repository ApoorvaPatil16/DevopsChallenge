var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var datasourceSchema = require('./datasourceSchema');
var datasource = mongoose.model('datasourceModel', datasourceSchema);
var datasource_router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
datasource_router.post('/', function(req, res) {
  var dataSourceData = new datasource(req.body);
  dataSourceData.save(function(err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  })
});
module.exports = datasource_router;
