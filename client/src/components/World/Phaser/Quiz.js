module.exports = {

	init: function(questionId) {
		this.questionId = questionId;
	},
	create: function() {
		
		this.window = this.game.make.bitmapData(this.game.world.width, this.game.world.height);
		this.window.anchor.setTo(0.5);

		this.quizWindow = this.window.sprite(this.game.world.centerX, this.game.world.centerY, 'quizWindow');
		this.quizWindow.anchor.setTo(0.5);

		this.game.add.image(this.game.camera.x, this.game.camera.y, this.window);
		console.info('Quiz');
	},
	update: function() {
	
	}
};