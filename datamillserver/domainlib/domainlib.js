var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    type: { type: String, required: true },
    base: { type: String, required: true },
    pattern: { type: String, default: '' },
    range: [{
        rangeOf: { type: String, default: 'value' },
        min: { type: Number, default: 0 },
        max: { type: Number, default: 0 }
    }],
    transformers: [{
        name: { type: String },
        value: { type: String }
    }]
});
schema.index(
{
	email:1,
	name:1
},{
	unique:true
});
module.exports = mongoose.model('DomainLib', schema, 'domainlibs');
