var expect = require('chai').expect;
var generator = require('../generatorapp/generator');

describe('Scenario:Test Suit For Generator', function() {
  var datamodel = {
    "name": "Report",
    "delivery": "feed",
    "download": {
      "packets": 2
    },
    "datafeed": {
      start: new Date(),
      end: new Date((new Date()).getTime() + 10000),
      oninterrupt: "donothing",
      flow: {
        type: "sporadic",
        bursts: {
          totalpackets: 100,
          occurrences: 4,
        },
        frequency: {
          packets: 10,
          time: 2,
          unit: "ss"
        }
      },
      transport: {
        medium: "Redis",
        config: { type: "nothing" }
      }
    },
    "attributes": [{
      name: "Name",
      domain: "First name",
      type:"Real Domain",
      uniqueness: false,
      options: {
        email: "vishal221092@gmail.com",
        base: "Names",
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
    generator.startGeneration(datamodel, function() {
      count++;
      console.log("Count is:" + count);
    });
    if (count == 10) {
      done()
    }
  });
});
