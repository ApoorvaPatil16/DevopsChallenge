var mongoose = require('mongoose');
var datamodel = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  privacy: { type: Boolean, default: false },
  delivery: String,
  deliveryOption: mongoose.Schema.Types.Mixed,
  attributes: [{
    name: { type: String, required: true },
    domain: { type: String, required: true },
    isUnique: { type: Boolean }
  }],
  //useremail: { type: String, required: true },
  updatedon: { type: Date, default: Date.now }
});

module.exports = mongoose.model("datamodel", datamodel);
