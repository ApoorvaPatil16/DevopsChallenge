var app = require('../app');
var expect = require('chai').expect;
var request = require("supertest");
//Supertest is a library to test apps, which have api endpoints or Request/Response
//Supertest wraps "Superagent", HTTP request/response library for server side
request = request(app);

describe("Domainlib routes testing", function() {

  it('Simple GET request to root url', function(done) {
    request.get('/').expect(200, done);
  });
  it('GET Request with returning some data', function(done) {
    request.get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err)
        }

        expect(res.body.length).to.be.not.equal('undefined');
        done();
      });
  });
  it('testing for not defined route', function(done) {
    request.get('/_undefined_route').expect(404, done);
  })
})