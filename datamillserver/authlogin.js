var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var userSchema = require('./userschema/userprofile');
//var userModel = mongoose.model('userprofileModel', userSchema);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var authrouter = require('express').Router();
var request = require("request");
var qs = require('querystring');

authrouter.post('/oauth/github', function(req, res) {
  console.log("Req param: ", req.params);
  console.log("Req query: ", req.query);
  console.log("Req body: ", req.body);
  var options = {
    method: 'POST',
    url: 'https://github.com/login/oauth/access_token',
    qs: {
      client_id: '15ccef8b737c4839249e',
      client_secret: '196e0ee75fe8854c6f687712d6021a7fb0e01016',
      code: req.body.code
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log("Access Token", qs.parse(body).access_token);
    var options1 = {
      method: 'GET',
      url: 'https://api.github.com/user',
      qs: { access_token: qs.parse(body).access_token },
      headers: {
        'User-Agent': 'request'
      }
    };
    request(options1, function(error1, response1, body1) {
      if (error1) throw new Error(error1);
      var result = JSON.parse(body1);
      console.log("Email :", result.email);
      if (result.email == "null") {
        console.log("Email is not accessible");
      } else {
        var email = result.email;

      }
      console.log(body1);
      res.send(body1);

    });
  });
})

authrouter.post('/auth/google', function(req, res) {
  console.log("Req param: ", req.params);
  console.log("Req query: ", req.query);
  console.log("Req body: ", req.body);
  var options = {
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    qs: {
      client_id: '440591203673-vlfttsppabo6ldkdleu08spg4jc7hmvm.apps.googleusercontent.com',
      client_secret: 'Kh_5Yf0pS0ub30e16u4_nB49',
      code: req.body.code,
      redirect_uri: 'http://localhost:8080',
      grant_type: 'authorization_code',
    },
    json: true
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log("Access Token", body.access_token);
    console.log(body);
    var options1 = {
      method: 'GET',
      url: ' https://www.googleapis.com/oauth2/v1/userinfo',
      qs: { access_token: body.access_token },
      headers: {
        'User-Agent': 'request'
      }
    };
    request(options1, function(error1, response1, body1) {
      if (error1) throw new Error(error1);
      var result = JSON.parse(body1);
      console.log("Email :", result.email);
      if (result.email == "null") {
        console.log("Email is not accessible");
      } else {
        var userEmail = result.email;
        userModel.find({ 'email': userEmail }, function(err, found) {
          if (err) return handleError(err);
          if (found.length == 0) {
            console.log("not found");
            //For new user create user info entry
            var userprofileData = new userModel();
            userprofileData.email = userEmail;
            userprofileData.displayName = result.name;
            userprofileData.picture = result.picture;
            userprofileData.gender = result.gender;

            console.log(userprofileData.email);
            userprofileData.save(function(err, data) {
              if (err) {
                return res.send(err);
              } else {

              }
            })
          } else {
            found[0]
            console.log("Found");
          }
        })

      }
      console.log(body1);
      res.send(body1);
    })
  });
});

module.exports = authrouter;



/*
user_router.post('/', function(req, res) {
  mongoose.connect('mongodb://localhost/datamillserver');
  var userprofileData = new userModel();
  userprofileData.email = res.body1;
  userprofileData.save(function)

})
*/
