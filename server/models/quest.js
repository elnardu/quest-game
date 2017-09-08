var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Quest', new Schema({
  title: String,
  stages: Object,
  points: Number
}));
