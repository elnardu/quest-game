var express = require("express"),
	Quiz = require("../models/quiz.js"),
	User = require("../models/user.js");

var router = express.Router();

router.route('/getByName').post(function(req, res) {
	var username = req.body.username;
	User.findOne({
		username: username
	}, function(err, user) {
		if (!user)
			res.json({success: false, error: "Пользователь не найден."});
		let data = {};
		Object.assign(data, user._doc);
		delete data.password;
		delete data.__v;

		res.json({success: true, data: data});
	});
});

router.route('/getMe').post(function(req, res) {
	var id = req.decoded.id;
	User.findById(id, function(err, user) {
		if (!user)
			res.json({success: false, error: "Пользователь не найден."});
		let data = {};
		Object.assign(data, user._doc);
		delete data.password;
		delete data.__v;

		res.json({success: true, data: data});
	});
});

router.route('/top').post(function(req, res) {
	let q = User.aggregate([
		{
			"$match": {}
		}, {
			"$group": {
				"_id": "$username",
				"points": {
					"$first": "$points"
				}
			}
		}, {
			"$sort": {
				"points": -1
			}
		}
	])
	q.exec(function(err, data) {
		res.json({success: true, data: data});
	});
});

// router.route('/topq').post(function(req, res) {
// 	let q = User.aggregate([
// 		{
// 			"$match": {}
// 		}, {
// 			"$group": {
// 				"_id": "$username",
// 				"points": {
// 					"$first": "$points"
// 				},
// 				"complitedQuests": {
// 					"$first": "$complitedQuests"
// 				}
// 			}
// 		}, {
// 			"$sort": {
// 				"_id": -1
// 			}
// 		}
// 	]);
// 	q.exec(function(err, data) {
// 		data = data.map(function(el){
// 			el.
// 		});
// 		res.json({success: true, data: data});
// 	});
// });

module.exports = router;
