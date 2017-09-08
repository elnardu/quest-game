#!/usr/bin/node

var express = require('express'),
	app = module.exports = express(),
	bodyParser = require("body-parser"),
	mongoose = require('mongoose'),
	jwt = require('jsonwebtoken'),
	morgan = require('morgan'),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	socketioJwt = require("socketio-jwt"),
	path = require('path'),
	exec = require('child_process').exec;

var config = require("./config.js"),
	User = require("./models/user.js"),
	Quest = require("./models/quest.js"),
	World = require("./models/world.js"),
	Quiz = require("./models/quiz.js");

var worldsRouter = require("./api/world"),
	quizRouter = require("./api/quiz"),
	questRouter = require("./api/quest"),
	authRouter = require("./api/auth"),
	userRouter = require("./api/user");


// --------------
// Configuration
// --------------
mongoose.Promise = global.Promise; //tell mongoose to use default promises
var port = config.port;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.options('*', function(req, res) { //allow cross origin requests
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	res.sendStatus(200);
});

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
});

// --------------
// Token check
// --------------

app.use("/api", function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.json({success: false, error: 'Failed to authenticate token.'});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.send({success: false, error: 'No token provided.'});
	}
});

// --------------
// Routes
// --------------
var appStatic = path.resolve(__dirname, "..", "client", "build");
app.use('/app', express.static(appStatic));
app.get('/', function(req, res){
	res.redirect('/app');
});
app.get('/app/*', function(req, res){
	res.sendFile(appStatic + '/index.html');
});

app.get('/changelog', function(req, res){
	exec('(cd ' + __dirname + ' ; git log -n 5)', function(err, stdout, stderr){
		res.status(200).type('text/plain').send(stdout);
	});
});

app.use('/api/world', worldsRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/quest', questRouter);
app.use('/api/user', userRouter);
app.use('/auth', authRouter);


function getQuestById(id) {
	var obj;
	Quest.findById(id, function(err, quest) {
		obj = quest;
	}).then(function() {});
}

var online = {}
var worlds = []
World.find({}, function(err, w) {
	worlds = w;
});

io.sockets.on('connection', socketioJwt.authorize({
	secret: app.get('superSecret'), timeout: 15000 // 15 seconds to send the authentication message
})).on('authenticated', function(socket) {
	console.log("User", socket.decoded_token.username, "connected");
	setTimeout(function() {
		socket.emit('chatMessage', {
			body: "Вы подключены к серверу!",
			type: 3 // 3 - for server messages
		});
	}, 5000);

	socket.on('disconnect', function(obj) {
		console.log("User", socket.decoded_token.username, "disconnected");
		// socket.broadcast.emit('player leave', {'id': id});
	});

	socket.on('enterWorld', function(obj) {
		var id = obj.id;
		World.find({
			_id: id
		}, function(world) {
			online[socket.decoded_token.username] = {
				x: world.startCoord_x,
				y: world.startCoord_y
			};
			io.to(socket.id).emit('coords', {
				x: world.startCoord_x,
				y: world.startCoord_y,
				username: socket.decoded_token.username
			});
		});
	});

	socket.on('coords', function(coords) {
		coords.username = socket.decoded_token.username;
		socket.broadcast.emit('coords', coords);
		console.log(coords);
	});

	socket.on('chatMessage', function(obj) {
		if (socket.decoded_token.admin) {
			obj.type = 2;
		} else {
			obj.type = 0;
		}
		socket.broadcast.emit('chatMessage', obj);
		console.log(obj);
	});

	socket.on('getQuest', function(id) {
		Quest.findById(id, function(err, quest) {
			io.to(socket.id).emit('sendQuest', quest);
			console.log("Quest sent");
		});
	});
});

http.listen(port, function() {
	console.log("Listening on port " + port);
});
