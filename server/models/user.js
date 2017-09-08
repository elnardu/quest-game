var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
	username: {
		type: String,
		unique: true
	},
	password: String,
	admin: Boolean,
	points: Number,
	complitedQuests: [String],
	complitedQuizzes: [String],
	assignedObjectives: [String],
	assignedQuests: [String],
	skin: {
		type: String,
		default: 'man'
	}
}));
