var app = require('../app');
var expect = require('chai').expect;
var request = require("supertest");
//Initilise supertest to test the app(which you want to test)
request = request(app);

describe('datamodel route api test suite', function() {
  var obj = {
    name: "test",
    description: "It is test data",
    status: "inactive",
    ispublic: false,
    delivery: "feed",
    format: "json",
    download: {
      packets: 1
    },
    datafeed: {
      start: new Date(),
      end: new Date(),
      oninterrupt: "donothing",
      flow: {
        type: "sporadic",
        bursts: {
          totalpackets: 12,
          occurrences: 2,
        },
        frequency: {
          packets: 12,
          time: 1,
          unit: "hh"
        }
      },
      transport: {
        medium: "Redis"
      }
    },
    attributes: [{
      name: "name",
      domain: "String",
      isunique: false
    }, {
      name: "Card",
      domain: "Number",
      isunique: false
    }, {
      name: "Id",
      domain: "Number",
      isunique: true
    }]
  };
  var authhead = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1N2Q4ZmM1MTk0ZTQ4NzNhOGJmNzUyY2QiLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo4MDgwIiwiZW1haWwiOiJuYXZlZW5wcmFzaGFudC42NUBnbWFpbC5jb20iLCJpYXQiOjE0NzQzODI3NTMsImV4cCI6MTQ3NDk4NzU1M30.sbDIDNlrVjG31_Z59Ptc12-qBFdn_9mO_CSG7KuKcLQ';
  it('getting all the datamodels', function(done) {
    request.get('/datamodel')
      .set('Authorization', authhead)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        console.log(res.body)
        expect(res.body).to.not.be.equal(undefined);
        done();
      })
  });
  it('Creating New Data model with datafeed', function(done) {
    request.post('/datamodel/')
      .set('Authorization', authhead)
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
  it('getting full structure of datamodel', function(done) {
    request.get('/datamodel/fulldatamodel/' + obj.name)
      .set('Authorization', authhead)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        console.log(res.body);
        expect(res.body).to.be.equal(obj.name);
        done();
      })
  });
  it('getting structure of defined datamodel', function(done) {
    request.get('/datamodel/structure/obj.name')
      .set('Authorization', authhead)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        console.log(res.body)
        expect(res.body).to.not.be.equal(undefined);
        done();
      })
  });
  it('updating Data model with download', function(done) {
    request.patch('/datamodel/update/' + obj.name)
      .set('Authorization', authhead)
      .send(obj)
      .expect(201)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        expect(res.body).to.not.equal(undefined);
        done();
      })
  })
  it('retry to create the same obj', function(done) {
    request.post('/datamodel')
      .set('Authorization', authhead)
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
  it('delete the created datamodel', function(done) {
    request.delete('/datamodel/delete/' + obj.name)
      .set('Authorization', authhead)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err)
        }
        done();
      })
  })
  it('trying to create the obj without Authorization header', function(done) {
    request.post('/datamodel')
      .send(obj)
      .expect(401)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        expect(res.body.message).to.be.equal("Please make sure your request has an Authorization header");
        done();
      })
  })
});
