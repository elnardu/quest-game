module.exports = DialogBox = function(game) {
	this.game = game;
	this.isShow = false;
	this.text = "";
	
	this.choices = [];
	this.choiceText = [];

	// DialogBox init
	// this.box = this.game.add.sprite(0, 0, "dialogBox");
	// var textStyle = { font: "16px Uni", fill: "#ffffff", wordWrap: true, wordWrapWidth: 390, strokeThickness: 1};
	// this.dialogText = this.game.add.text(0, 0, "", textStyle);
	// this.dialogText.smoothed = false;
	// this.box.scale.setTo(7, 7);
	// this.box.smoothed = false;

	// this.box.visible = false;
	// this.dialogText.visible = false;


	// ChoiceBox init
	// this.choiceText[0] = this.game.add.text(0, 0, "", textStyle);
	// this.choiceText[0].smoothed = false;
	// this.choiceText[0].visible = false;

	// this.choiceText[1] = this.game.add.text(0, 0, "", textStyle);
	// this.choiceText[1].smoothed = false;
	// this.choiceText[1].visible = false;

	// this.choiceText[2] = this.game.add.text(0, 0, "", textStyle);
	// this.choiceText[2].smoothed = false;
	// this.choiceText[2].visible = false;

	// this.choiceText[3] = this.game.add.text(0, 0, "", textStyle);
	// this.choiceText[3].smoothed = false;
	// this.choiceText[3].visible = false;

};

DialogBox.prototype.show = function(text, heroY) {
	this.isShow = true;
	// this.dialogText.text = text;

	this.box = this.game.add.sprite(0, 0, "dialogBox");
	var textStyle = { font: "16px Uni", fill: "#ffffff", wordWrap: true, wordWrapWidth: 390, strokeThickness: 1};
	this.dialogText = this.game.add.text(0, 0, text, textStyle);
	this.dialogText.smoothed = false;
	this.box.scale.setTo(7, 7);
	this.box.smoothed = false;
	

	if(heroY >= this.game.camera.y + this.game.camera.height/2){
		this.box.y = this.game.camera.y + 10;
	} else {
		this.box.y = this.game.camera.y + this.game.camera.height - this.box.height - 5;
	}

	this.box.x = this.game.camera.x + this.game.camera.width/2 - this.box.width/2;

	this.box.visible = true;
	this.dialogText.visible = true;

	// this.box.height = this.dialogText.height + 20;
	// this.box.width = this.dialogText.width + 20;
	// this.hero.addChild(this.box);

	// this.box.addChild(this.dialogText);
	// this.dialogText.anchor.setTo(0.5);

	this.dialogText.x = this.box.x + 30;
	this.dialogText.y = this.box.y + 25;

	// this.dialogText.fillStyle = 'rgb(149, 165, 166)';
	// this.hero.addChild(this.dialogText);
	// // this.dialogText.anchor.setTo(0.5);
	// this.dialogText.y = -60;
	// this.box.y = -60;
};

DialogBox.prototype.type = function(text) {
	if(this.intervalId) window.clearInterval(this.intervalId);
	this.dialogText.text = "";

	var i = 0;
	var self = this;
	this.intervalId = window.setInterval(function() {
		self.dialogText.text += text[i];
		i++;
		if(i == text.length) window.clearInterval(self.intervalId);
	}, 50);
};

DialogBox.prototype.hide = function() {
	if(this.intervalId) window.clearInterval(this.intervalId);
	this.dialogText.text = "";
	this.box.visible = false;
	this.dialogText.visible = false;
	this.isShow = false;
};

DialogBox.prototype.showChoices = function(choices) {

	// for (var i = 0; i < choices.length; i++) {
	// 	this.choiceText[i].text = choices[i];
	// 	this.
	// }
};
