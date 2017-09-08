// $ = require('jQuery');
module.exports = Net = function(self){
	this.socket = io();
	this.self = self;
	this.socket.emit('init', {
		'id': global.username
	});

	this.socket.on('player leave', function(obj){
		self.players[obj.id].destroy();
	});

	this.socket.on('coords', function(obj) {
		if(!self.players[obj.id]){
				self.players[obj.id] = new Player(self.game, obj.id);
		}
		self.players[obj.id].hero.x = obj.x;
		self.players[obj.id].hero.y = obj.y;
	});

	this.socket.on('sendQuest', function(obj) {
		console.log(obj);
		self.questManager.addDownloadedQuest(obj);
	});

	this.socket.on('chatMessage', function(obj) {
		self.chat.addMessage(obj);
	});
};

Net.prototype.sendCoords = function(x, y) {
	this.socket.emit('coords', {
		'id': global.username,
		'x': x,
		'y': y
	});
};

Net.prototype.getQuest = function(questId) {
	this.socket.emit('getQuest', questId);
	console.info("Downloading quest: " + questId);
};

Net.prototype.sendMessage = function(obj) {
	this.socket.emit('chatMessage', obj);
};
