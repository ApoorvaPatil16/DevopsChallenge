var mongoose = require('mongoose');
var schema = mongoose.Schema;
var datasourceSchema = new schema({
  name: String,
  tags: [String],
  description: String,
  data: String
});
module.exports = datasourceSchema;
