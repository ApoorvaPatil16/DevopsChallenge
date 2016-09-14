var mongoose = require('mongoose');
var schema = mongoose.Schema;
var importdataSchema = new schema({
	email:{type:String,required:true},
  sourcename: {type:String,required:true},
  data: { type: Object }
});
importdataSchema.index({
	email:1,
	sourcename:1
},{
	unique:true
})
var data = mongoose.model('importdata', importdataSchema, 'importdata');
module.exports = data;
