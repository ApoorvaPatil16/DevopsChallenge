var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var domainSchema = require('./domainlib');
var Domain = mongoose.model('Domain', domainSchema);
var domainlib_router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
domainlib_router.post('/', function(req, res) {
  mongoose.connect('mongodb://localhost:27018/datamillserver');
  var domainData = new Domain(req.body);
  domainData.save(function(err, result) {
    if (err) {
      return res.send(err);
    }
    return res.send(result);
  })
});
module.exports = domainlib_router;
