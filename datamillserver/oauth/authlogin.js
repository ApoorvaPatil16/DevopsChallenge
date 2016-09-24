var authrouter = require('express').Router();
var authprocessor = require('./authprocessor');
var request = require("request");
var qs = require('querystring');
var appconf = require('../../appconf')


//Oauth2 login for Github
authrouter.post('/oauth/github', function(req, res) {
  console.log("Req param: ", req.params);
  console.log("Req query: ", req.query);
  console.log("Req body: ", req.body);
  var options = {
    method: 'POST',
    url: 'https://github.com/login/oauth/access_token',
    qs: {
      client_id: appconf.GITHUB_CLIENTID,
      client_secret: appconf.GITHUB_SECRET,
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
      if (result.email == "null" || result.email == null || result.email == undefined) {
        console.log("Email is not accessible");
        /////ADD A POP UP WINDOW FOR USERS TO ALLOW ACCESS TO EMAIL
        return res.status(422).send({ "error": "can't able to get email Please make email visible" });
      } else {
        result.picture = result.avatar_url;
        authprocessor.generateToken(result, function(code, data) {
          return res.status(code).send(data);
        }, function(code, err) {
          return res.status(code).send({ error: err });
        });
      }
    });
  });
})

//Oauth2 login for Google
authrouter.post('/auth/google', function(req, res) {
  console.log("Req param: ", req.params);
  console.log("Req query: ", req.query);
  console.log("Req body: ", req.body);
  var options = {
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    qs: {
      client_id: appconf.GOOGLE_CLIENTID,
      client_secret: appconf.GOOGLE_SECRET,
      code: req.body.code,
      redirect_uri: appconf.GOOGLE_URI,
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
      if (result.email == "null" || result.email == null || result.email == undefined) {
        console.log("Email is not accessible");
        return res.status(500).send("Email is not accessible");
        /////ADD A POP UP WINDOW FOR USERS TO ALLOW ACCESS TO EMAIL
      } else {
        result.picture = result.picture;
        authprocessor.generateToken(result, function(code, data) {
          return res.status(code).send(data);
        }, function(code, err) {
          return res.status(code).send({ error: err });
        });
      }
    })
  });
});
module.exports = authrouter;
