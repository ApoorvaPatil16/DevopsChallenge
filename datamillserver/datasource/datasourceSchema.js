var mongoose = require('mongoose');
var schema = mongoose.Schema;
var datasourceSchema = new schema({
  name: { type: String, unique: true, required:true},
  tags: [{ type: String }],
  description: String
    // on: { type: Date, default: Date.now }
});
var datasource = mongoose.model('datasourcemodels', datasourceSchema, 'datasourcemodels');
module.exports = datasource;

