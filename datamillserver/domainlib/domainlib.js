var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var domainSchema = new Schema({
  name: { type: String, unique: true },
  type: String,
  baseType: String,
  range: {
    mininumWord: Number,
    maximumWord: Number,
    minimumChar: Number,
    maximumChar: Number
  },
  pattern: String,
  description: String,
  baseDataSource: String,
  functions: [String]
});
module.exports = domainSchema;
