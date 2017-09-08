var express = require("express"),
	User = require("../models/user.js"),
	jwt = require('jsonwebtoken');


var router = express.Router();

router.route('/signup').post(function(req, res) {
	var username = req.body.username,
		password = req.body.password;

	if (!username) {
		res.json({error: "Введите имя пользователя!", success: false});
		return;
	}
	if (!password) {
		res.json({error: "Введите пароль!", success: false});
		return;
	}

	username = username.toLowerCase();

	// User.find({password: password}, function(err, docs){
	// 	if(docs.length != 0){
	// 		res.json({error: "Такой пароль уже есть у пользователя "+docs[0].username, success: false});
	// 	}
	// });

	var user = new User({username: username, password: password, admin: false});
	user.save(function(err) {
		if (err) {
			if (err.name === 'MongoError' && err.code === 11000) {
				res.json({error: "Пользователь с таким ником уже есть!", success: false});
				return;
			}
			throw err;
		}

		console.log("User " + username + " sign up!");
		var token = jwt.sign({
			username: user.username,
			admin: user.admin,
			id: user._id
		}, req.app.get('superSecret'), {
			expiresIn: 86400 // expires in 24 hours
		});
		res.json({success: true, token: token});
	});
});

router.route('/signin').post(function(req, res) { //SIGN IN
	var username = req.body.username,
		password = req.body.password;

	if (!username) {
		res.json({error: "Введите имя пользователя!", success: false});
		return;
	}
	if (!password) {
		res.json({error: "Введите пароль!", success: false});
		return;
	}

	User.findOne({
		username: username
	}, function(err, user) {
		if (err)
			throw err;
		if (!user) {
			res.json({success: false, error: "Этого пользователя не существует!"});
		} else {
			if (user.password != password) {
				res.json({success: false, error: "Не правильный пароль!"});
			} else {
				var token = jwt.sign({
					username: user.username,
					admin: user.admin,
					id: user._id
				}, req.app.get('superSecret'), {
					expiresIn: 86400 // expires in 24 hours
				});
				res.json({success: true, token: token, admin: user.admin});
				console.log("User " + user.username + " sign in!");
			}
		}
	});
});


module.exports = router;
