var mongoClient = require("mongodb").MongoClient;
var attr = [{ name: "Name", domain: "String" }, { name: "Age", domain: "Number" }, { name: "Company", domain: "String" }];
gettingAttrProperties(attr);
var gettingAttrProperties = function(attr) {
  var myProcesses = [];
  attr.forEach(function(obj) {
    myProcesses.push(highland.flatMap(function(newobj) {
      console.log("inside top level map", newobj);
      return highland(function(push, next) {
        console.log(" inside source creatar", newobj);
        if (obj.domain == "String") {
          newobj[obj.name] = generateString(obj);
        } else if (obj.domain == "Number") {
          newobj[obj.name] = generateNumber(obj);
        } else if (obj.domain == "Decimal") {
          newobj[obj.name] = generateDecimal(obj);
        } else if (obj.domain == "Date") {
          newobj[obj.name] = generateDate(obj);
        } else if (obj.domain == "Boolean") {
          newobj[obj.name] = generateBoolean(obj);
        } else if (obj.domain == "Hexadecimal") {
          newobj[obj.name] = generateHexadecimal(obj);
        } else {
          newobj[obj.domain] = generateOther(obj);
        }
        push(null, newobj);
        push(null, highland.nil);
      })
    }));
  })
}

function generateString(obj) {
  var length = Math.floor((Math.random() * (15 - 1)) + 1);
  var text = "";
  var possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  return text;
}

function generateNumber(obj) {
  return Math.floor((Math.random() * (1000000 - 0)) + 0);
}

function generateDecimal(obj) {
  var afterDecimal = Math.floor((Math.random() * (10000 - 1)) + 1);
  var beforeDecimal = Math.floor((Math.random() * (1000000 - 0)) + 0);
  return beforeDecimal + "." + afterDecimal;
}

function generateDate(obj) {
  var start = new Date(2012, 0, 1);
  var end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateBoolean(obj) {
  return Math.random() >= 0.5;
}

function generateHexadecimal(obj) {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function generateOther(obj) {
  return mongoClient.connect("mongodb://localhost:27018/datamillserver", function(err, db) {
    return db.collection('domainlibs').findOne({ "name": obj.name, "email": "vishal221092@gmail.com" }, function(err, result) {
      console.log(result)
    });
  });
}
