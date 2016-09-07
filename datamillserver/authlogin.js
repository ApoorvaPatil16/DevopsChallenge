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
    console.log(qs.parse(body).access_token);
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

      console.log(body1);
      res.send(body1);
    });
  });


})

module.exports = authrouter;
