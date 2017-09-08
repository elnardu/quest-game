var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('World', new Schema({
    name: String,
    description: String,
    map: String,
    startCoord_x: Number,
    startCoord_y: Number
}));
