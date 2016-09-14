var mongoose = require('mongoose');
var schema = mongoose.Schema;
var datasourceSchema = new schema({
	email:{type:String,required:true},
  name: { type: String, required:true},
  tags: [{ type: String }],
  description: String
    // on: { type: Date, default: Date.now }
});
datasourceSchema.index({
email:1,
name:1
},{
	unique:true
})
var datasource = mongoose.model('datasourcemodels', datasourceSchema, 'datasourcemodels');
module.exports = datasource;

