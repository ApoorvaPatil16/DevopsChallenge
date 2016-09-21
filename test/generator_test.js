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
