var express = require("express"),
	Quiz = require("../models/quiz.js"),
	User = require("../models/user.js");

var router = express.Router();

router.route('/get').post(function(req, res) {
	var id = req.body.id;
	Quiz.findById(id, function(err, quiz) {
		res.json({quiz: quiz, success: true});
	});
});

router.route('/list').post(function(req, res) {
	var id = req.body.id;
	Quiz.find({}, function(err, quizzes) {
		res.json({quizzes: quizzes, success: true});
	});
});

router.route('/success').post(function(req, res) {
	var id = req.decoded.id,
		quizId = req.body.id,
		points = 0;
	Quiz.findById(quizId, function(err, quiz) {
		points = quiz.points;
		User.findById(id, function(err, user) {
			if (!user.complitedQuizzes.includes(req.body.id)) {
				user.complitedQuizzes.push(req.body.id);
				user.points += points;
			}
			user.save();
			res.json({success: true});
		});
	});

});

module.exports = router;
