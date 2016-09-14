var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive', 'error', 'interrupt'], default: 'inactive' },
  ispublic: { type: Boolean, default: false },
  delivery: { type: String, enum: ["download", "feed"] },
  format: { type: String, enum: ['csv', 'json', 'tsv'], default: 'json' },
  download: {
    packets: { type: Number }
  },
  datafeed: {
    start: { type: Date },
    end: { type: Date },
    oninterrupt: { type: String, enum: ['restart', 'donothing'], default: 'donothing' },
    flow: {
      type: { type: String, enum: ['sporadic', 'continuous'] },
      bursts: {
        totalpackets: { type: Number },
        occurrences: { type: Number, min: 1 },
      },
      frequency: {
        packets: { type: Number },
        time: { type: Number, min: 1, default: 1 },
        unit: {
          type: String,
          enum: ['mm', 'hh', 'ss'],
          default: 'mm'
        }
      }
    },
    transport: {
      medium: { type: String, enum: ['redis', 'kafka', 'stream'] },
      config: { type: Object }
    }
  },
  structurename: { type: String },
  patterns: [{
    name: { type: String },
    mix: { type: Number }
  }],
  email: { type: String, required: true },
  updatedon: { type: Date, default: Date.now }
});

schema.index({
  name: 1,
  username: 1
}, { unique: true });

module.exports = mongoose.model("datamodel", schema);
