var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: { type: String, unique: true, required: true },
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

module.exports = mongoose.model('DomainLib', schema, 'domainlibs');
