import Entity from './Entity';

class Player extends Entity {
	constructor(game, name, x, y, texture, options) {
		options = options || {};
		options.player = true;
		super(game, name, x, y, texture, options);
		this.animations.add('runUp', [6, 7, 8, 9], 10, true);
		this.animations.add('runDown', [12, 13, 14, 15], 10, true);
		this.animations.add('runRight', [18, 19, 20, 21, 22, 23], 10, true);
		this.animations.add('runLeft', [24, 25, 26, 27, 28, 29], 10, true);


		if(options){
			if(options.mainPlayer){
				// this.game.physics.arcade.enable(this);
				this.game.camera.follow(this);
				this.body.collideWorldBounds = true;
			}
		}
	}
	update() {
		let dy = this.body.deltaY();
		let dx = this.body.deltaX();
		if(dy < 0){
			this.animations.play('runUp');
		} else if(dy > 0){
			this.animations.play('runDown');
		} else if(dx < 0){
			this.animations.play('runLeft');
		} else if(dx > 0){
			this.animations.play('runRight');
		} else {
			this.frame = 0;
		}
	}
}

export default Player;
