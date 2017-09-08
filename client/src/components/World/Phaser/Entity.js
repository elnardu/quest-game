import Phaser from 'phaser';

class Entity extends Phaser.Sprite {
	constructor(game, name, x, y, texture, options) {
		super(game, x, y, texture); 	//Creating Phaser.Sprite
		this.game.world.add(this);

		if(options){
			if(options.player) this.id = name;
			if(options.quiz) this.linkedQuiz = options.quiz;
			if(options.quest) this.linkedQuest = options.quest;

			//Handle view of health, stats, etc
		}

		this.id = this.id || ("entity_" + name);
		console.log("New entity spawned: " + this.id);

		this.smoothed = false;
		this.anchor.setTo(0.5);
		this.game.physics.arcade.enable(this);

		var nameStyle = nameStyle || {
			font: "15px Pixar",
			fill: "#ffffff",
			align: "center",
			stroke: "black",
			strokeThickness: 1.5
		};

		this.btmUsername = this.game.add.text(0, 0, name, nameStyle);
		this.btmUsername.smoothed = false;
		this.addChild(this.btmUsername);
		this.btmUsername.anchor.setTo(0.5);
		this.btmUsername.y = -37;
		if(options.animated) {
			this.animations.add('stay', null, 5, true);
			this.animations.play('stay');
		}
		if(options.visible === false){
			this.alpha = 0;
		}
	}
}

export default Entity;
