var express = require("express"),
	World = require("../models/world.js");

var router = express.Router();

router.route('/get').post(function(req, res) {
	World.find({}, function(err, worlds) {
		res.json({worlds: worlds, success: true});
	});
});

module.exports = router;
