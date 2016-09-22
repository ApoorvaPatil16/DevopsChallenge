var expect = require('chai').expect;
var generator = require('../generatorapp/generator');

describe('Scenario:Test Suit For Generator', function() {
  var datamodel = {
    "attributes": [{
      name: "Name",
      domain: "String",
      uniqueness: false,
      options: {
        email: "vishal221092@gmail.com",
        base: "String",
        range: [{
          rangeOf: "words",
          min: 2,
          max: 5
        }, {
          rangeOf: "length",
          min: 10,
          max: 30
        }]
      }
    }, {
      name: "Pincode",
      domain: "Number",
      uniqueness: false,
      options: {
        email: "vishal221092@gmail.com",
        base: "Number",
        range: [{
          rangeOf: "value",
          min: 10,
          max: 30
        }]
      }
    }, {
      name: "Fathers Name",
      domain: "Firstname",
      uniqueness: false,
      options: {
        email: "vishal221092@gmail.com",
        base: "First name",
        range: [{
          rangeOf: "words",
          min: 2,
          max: 5
        }, {
          rangeOf: "length",
          min: 10,
          max: 30
        }]
      }
    }, {
      name: "id",
      domain: "Number",
      uniqueness: false,
      options: {
        email: "vishal221092@gmail.com",
        base: "Number",
        range: [{
          rangeOf: "value",
          min: 1000,
          max: 9999
        }]
      }
    }, {
      name: "Birthdate",
      domain: "Date",
      uniqueness: false,
      options: {
        email: "vishal221092@gmail.com",
        base: "Date",
        range: [{
          rangeOf: "value",
          min: 100000000,
          max: 300000000
        }]
      }
    }, {
      name: "isActive",
      domain: "Boolean",
      uniqueness: false,
      options: {
        email: "vishal221092@gmail.com",
        base: "Boolean",
        range: [{
          rangeOf: "value",
          min: 10,
          max: 30
        }]
      }
    }, {
      name: "age",
      domain: "Number",
      uniqueness: false,
      options: {
        email: "vishal221092@gmail.com",
        base: "Number",
        range: [{
          rangeOf: "value",
          min: 1,
          max: 200
        }]
      }
    }]
  }
  it('Instantiate ticker instance', function(done) {
    this.timeout(30000)
    var count = 0;
    generator.kicker(datamodel, function(data) {
      console.log(data);
      count++;
      expect(data['Name']).to.not.equal(undefined)
      expect(data['Pincode']).to.not.equal(undefined)
      expect(data['Fathers Name']).to.not.equal(undefined)
      if (count == 10) {
        done()
      }
    });

  });
});
