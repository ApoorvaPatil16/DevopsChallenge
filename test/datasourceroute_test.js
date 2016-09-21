var app = require('../app');
var expect = require('chai').expect;
var request = require('supertest');
request = request(app);

describe('DATASOURCE test suite', function() {
    it(':::Posting to datasource', function(done) {
        var testObj = {
            name: 'pancard',
            tags: ["testing purpose"],
            description: "for testing with mocha"
        }
        request.post('/datasource/')
            .send(testObj)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    done(err);
                }
                expect(res.request._data.name).to.be.equal(testObj.name);
                done();
            });
    });
    it(':::Listing from datasource', function(done) {
        request.get('/datasource/')
            .expect(200)
            .end(function(err, res) {
                if (err) done(err);
                expect(res.body.length).to.not.be.equal(undefined);
                done();
            });
    });

    it(':::Patching datasource', function(done) {
        var testObj = {
            name: 'pancard',
            tags: ["testing purpose"],
            description: "success for third test again"
        }
        request.patch('/datasource/')
            .send(testObj)
            .expect(200)
            .end(function(err, res) {
                if (err) throw (err);
                expect(res.request._data.description).to.be.equal(testObj.description);
                done();
            });
    });
});
