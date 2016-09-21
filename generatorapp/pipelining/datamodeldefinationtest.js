var app = require('/datamodelspecification');
var expect = require('chai').expect;
var request = require("supertest");
//Initilise supertest to test the app(which you want to test)
request = request(app);

describe('Getting Data model definition whose data is to generate', function() {
  it('Getting one data model for the generation', function(done) {
    request.get('/datamodel/')
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        expect(res.data.length).to.be.equal(1);
        done();
      })
  });
});



// var mongoClient = require("mongodb").MongoClient;
// var url = 'mongodb://localhost:27018/datamillserver';
// mongoClient.connect(url, function(err, db) {
//   console.log("Connected correctly to server");
//   var collection = db.collection('datamodels');
//   collection.findOne({ name: "something" }, function(err, docs) {
//     console.log(docs.data);
//   });
//   db.close();
// });
// module.exports = mongoClient;

// Lets create some default attributes and pass those to the function




// return mongoClient.connect("mongodb://localhost:27018/datamillserver", function(err, db) {
//   return db.collection('importdata').findOne({ "sourcename": "First name" }, function(err, result) {
//     console.log(result.data);
//     var x = Math.floor((Math.random() * 100) + 1);
//     console.log(x);
//     newobj[obj.name] = result.data[x].firstname;
//     console.log("db returns", newobj);
//     db.close();
//     push(err, newobj);
//     push(null, highland.nil);
//   })
// })
