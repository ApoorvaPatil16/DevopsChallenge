var express = require('express');
var primitivedomain_router = express.Router();
primitivedomain_router.get('/', function(req, res) {
  var data = [{
    "id": 1,
    "type": "primitive",
    "name": "String"
  }, {
    "id": 2,
    "type": "primitive",
    "name": "Number"
  }, {
    "id": 3,
    "type": "primitive",
    "name": "Boolean"
  }, {
    "id": 4,
    "type": "primitive",
    "name": "Date"
  }, {
    "id": 5,
    "type": "primitive",
    "name": "Time"
  }, {
    "id": 6,
    "type": "primitive",
    "name": "Decimal"
  }, {
    "id": 7,
    "type": "primitive",
    "name": "Hexadecimal"
  }, {
    "id": 8,
    "type": "primitive",
    "name": "TimeStamp"
  }]
  return res.send(data);
});
module.exports = primitivedomain_router;
