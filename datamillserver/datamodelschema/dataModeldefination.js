var mongoose = require('mongoose');
var dataModelDefination = new mongoose.Schema({
  title: { type: String, unique: true, lowercase: true },
  discriptiion: String,
  privacy: String,
  deliveryType: String,
  deliveryOption: Object,
  attributes: Array
});

module.exports = dataModelDefination;
