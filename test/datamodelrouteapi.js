var app = require('../app');
var expect = require('chai').expect;
var request = require("supertest");
//Initilise supertest to test the app(which you want to test)
request = request(app);

describe('datamodel route api test suite', function() {
  var obj = {
    name: "Card"
  }
  it('Creating New Data model with datafeed', function(done) {
    request.post('/datamodel/')
      .send(obj)
      .expect(201)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        expect(res.body.name).to.be.equal(obj.name);
        done();
      })
  });
  it('getting all the datamodels', function(done) {
    request.get('/datamodel')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        expect(res.data.length).to.not.be.equal(undefined);
        done();
      })
  });
  it('updating Data model with download', function() {
    request.patch('/datamodel/update/' + obj.name)
      .send(obj)
      .expect(201)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        expect(res.body).to.be.equal("please specify the name");
        done();
      })
  })
  it('retry to create the same obj', function() {
    request.post('/datamodel')
      .send(obj)
      .expect(409)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        expect(res.body.error).to.be.equal("already exist the data model");
        done();
      })
  })
});
