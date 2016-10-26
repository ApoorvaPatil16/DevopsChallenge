var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: { type: String, required: true },
    datamodelname: { type: String, required: true },
<<<<<<< HEAD
    email: { type: String, required: true },
=======
    email: { type: String, reruired: true },
>>>>>>> d637e05e6388b87abec11e3d53b5d77adfbc2d7d
    attributes: [{
        name: { type: String, required: true },
        domain: { type: String, required: true },
        isunique: { type: Boolean },
        options: { type: Object }
    }]
});
schema.index({
    name: 1,
<<<<<<< HEAD
    email: 1
=======
    datamodelname: 1,
    username: 1
>>>>>>> d637e05e6388b87abec11e3d53b5d77adfbc2d7d
}, { unique: true });

module.exports = mongoose.model("datamodelstructure", schema);
