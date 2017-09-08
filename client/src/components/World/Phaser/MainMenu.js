module.exports = {

	create: function () {
		var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.add(this.startGame, this);

		var textStyle = { font: "bold 30px Uni", fill: "#e74c3c", align: "center" };

		this.textUsername = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, "username: " + global.username, textStyle);
		this.textUsername.anchor.setTo(0.5);
		// this.textUsername.smoothed = false;
		this.playButton = this.add.button(this.game.world.centerX, this.game.world.centerY, 'playButton', this.startGame, this);
		this.playButton.anchor.setTo(0.5);
		console.info('MainMenu');

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	And start the actual game
		this.state.start('Game');

	}

};