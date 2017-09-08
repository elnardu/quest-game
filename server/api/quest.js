var express = require("express"),
	Quest = require("../models/quest.js");

var router = express.Router();

router.route('/get').post(function(req, res) {
	var id = req.body.id;
	Quest.findById(id, function(err, quest) {
		res.json({quest: quest, success: true});
	});
});

router.route('/list').post(function(req, res) {
	var id = req.body.id;
	Quest.find({}, function(err, quests) {
		res.json({quests: quests, success: true});
	});
});

router.route('/edit').post(function(req, res) {
	var id = req.body.data._id,
		data = req.body.data;
	// console.log(data);
	if(id) {
		Quest.update({
			_id: id
		}, {
			$set: data
		}, function(err, quest) {
			if (err) throw err;
			res.json({success: true});
		});
	} else {
		var quest = new Quest(data);
		quest.save(function(err) {
			if(err) throw err;
			res.json({success: true});
		});
	}
});

module.exports = router;
