var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: { type: String, required: true },
    datamodelname: { type: String, required: true },
    email: { type: String, reruired: true },
    attributes: [{
        name: { type: String, required: true },
        domain: { type: String, required: true },
        isunique: { type: Boolean },
        options: { type: Object }
    }]
});
schema.index({
    name: 1,
    datamodelname: 1,
    username: 1
}, { unique: true });

module.exports = mongoose.model("datamodelstructure", schema);
