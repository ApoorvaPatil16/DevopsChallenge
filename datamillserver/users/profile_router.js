var express = require('express');
var profile_router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userModel = require('../users/userprofile');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

profile_router.get('/', function(req, res) {
  console.log("profile of :");
  var profileId = req.user;
  userModel.find({ '_id': profileId }, function(err, found) {
    console.log("error", err, "found", found)
    if (err) return handleError(err);
    //var userprofileData = new userModel();
    if (found[0]) {
      console.log("User Email", found[0].email);
      return res.send(found[0]);
    } else {
      return res.status(500).send({ error: "no user found please clear cache" });
    }
  })
})
module.exports = profile_router;
