var mongoose = require('mongoose');
var schema = mongoose.Schema;
var importdataSchema = new schema({
  sourcename: String,
  data: { type: Object }
});
var data = mongoose.model('importdata', importdataSchema, 'importdata');
module.exports = data;
