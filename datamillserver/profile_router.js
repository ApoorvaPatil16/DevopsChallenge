var express = require('express');
var profile_router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userModel = require('./userschema/userprofile');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

profile_router.get('/', function(req, res) {
  console.log("profile of :");
  var profileId = req.user;
  userModel.find({ '_id': profileId }, function(err, found) {
    if (err) return handleError(err);
    //var userprofileData = new userModel();
    console.log("User Email", found[0].email);
    return res.send(found[0]);
  })
})
module.exports = profile_router;
