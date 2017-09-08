module.exports = Chat = function(self){
	this.self = self;
	this.net = this.self.net;
	
	this.chat = document.getElementById("chat");
	this.messages = document.getElementById("messages");
	this.recentMessages = document.getElementById("recentMessages");
	this.input = document.getElementById("chatInput");

	this.chat.style.display = 'none';
	this.recentMessages.display = 'block';
	this.isShow = false;

	this.messageProto = document.createElement('div');
	this.messageProto.className = "message";
	this.messageProto.innerHTML = "";
};

Chat.prototype.show = function() {
	this.chat.style.display = 'block';
	this.recentMessages.display = 'none';
	this.isShow = true;

	this.input.focus();
};

Chat.prototype.hide = function() {
	this.chat.style.display = 'none';
	this.recentMessages.display = 'block';
	this.isShow = false;
};

Chat.prototype.addMessage = function(messageObj) {
	var message1 = this.messageProto.cloneNode(true);
	message1.innerHTML = messageObj.from + ": " + messageObj.text;
	var message2 = message1.cloneNode(true);
	this.recentMessages.appendChild(message1);
	this.messages.appendChild(message2);
	setTimeout(function() {
		this.recentMessages.removeChild(message1);
	}, 3000);
};

Chat.prototype.sendMessage = function() {
	var text = this.input.value;
	if(text === "") {
		this.hide();
		return;
	}
	var messageObj = {
		text: text,
		from: global.username
	};

	this.input.value = "";
	this.net.sendMessage(messageObj);
	this.addMessage(messageObj);
	this.hide();
};


