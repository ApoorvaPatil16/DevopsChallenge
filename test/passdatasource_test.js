var expect = require('chai').expect;
var mongoose= require('mongoose')
mongoose.connect('mongodb://localhost:27017/datamillserver');
/*writing test cases for the ticker component*/
var passdatasource = require('../datamillserver/datasource/passdatasource');
describe('Scenario: passdatasource', function() {
  it('Testing of passdatasource', function(done) {
    //There will be multiple data models trying to run in parallel, each requires their own copy of the ticker
    //As each data model will have its own schedule, rate or frequency and occurrences 
    passdatasource('First name','rawat24892@gmail.com')
    done();
  });
});
