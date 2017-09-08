var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Quiz', new Schema({
  title: String,
  text: String,
  type: String,
  question: Object,
  points: Number
}));
