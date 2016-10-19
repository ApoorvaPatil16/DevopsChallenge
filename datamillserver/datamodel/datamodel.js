var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive', 'error', 'interrupt'], default: 'inactive' },
    ispublic: { type: Boolean, default: false },
    delivery: {
        type: String,
        enum: ["download", "feed"],
        default: 'download'
    },
    format: { type: String, enum: ['csv', 'json', 'tsv'], default: 'json' },
    download: {
        packets: { type: Number }
    },
    datafeed: {
        start: { type: Date },
        end: { type: Date },
        oninterrupt: { type: String, enum: ['restart', 'donothing', undefined] },
        flow: {
            type: { type: String, enum: ['sporadic', 'continuous', undefined] },
            bursts: {
                totalpackets: { type: Number },
                occurrences: { type: Number, min: 1 },
            },
            frequency: {
                packets: { type: Number },
                time: { type: Number, min: 1 },
                unit: {
                    type: String,
                    enum: ['mm', 'hh', 'ss', undefined]
                }
            }
        },
        transport: {
            medium: { type: String, enum: ['Redis', 'Kafka', 'Websocket', 'Mongo DB', 'Redis MQ'] },
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
    email: 1
}, { unique: true });

module.exports = mongoose.model("datamodel", schema);
