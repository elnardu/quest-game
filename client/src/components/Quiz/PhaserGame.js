import 'pixi';
import 'p2';
import Phaser from 'phaser';

import bulletIm from '../../../public/assets/fireball.png';
import groundIm from '../../../public/assets/gfx/ground.png';
import heroIm from '../../../public/assets/Fire.png';
import mobIm from '../../../public/assets/Mob1.png';
import explosionIm from '../../../public/assets/gfx/explosion.png';

var GameState = function(game) {};

GameState.prototype.preload = function() {
	this.game.load.spritesheet('bullet', bulletIm, 64, 64);
	this.game.load.image('ground', groundIm);
	this.game.load.spritesheet('hero', heroIm, 64, 64);
	this.game.load.image('mob', mobIm);
	this.game.load.spritesheet('explosion', explosionIm, 128, 128);
};

GameState.prototype.create = function() {
	// Set stage background color
	this.game.stage.backgroundColor = '#3498db';
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

	this.hero = this.game.add.sprite(50, this.game.height - 64, 'hero');
	this.hero.animations.add('fire', null, 8, false);
	this.hero.anchor.setTo(0.5, 0.5);
	// this.hero.animations.play('fire');
	this.hero.frame = 0;


	// this.gun = this.game.add.sprite(50, this.game.height - 64, 'bullet');
	// this.gun.anchor.setTo(0.5, 0.5);
	// this.gun.animations.add('fly');
	// this.gun.animations.play('fly', 10, true);

	this.object = this.game.add.sprite(this.game.width - 100, this.game.height - 64, 'mob');
	this.object.scale.setTo(1, 1);
	this.object.anchor.setTo(0.5, 0.5);
	this.object.smoothed = false;
	this.game.physics.enable(this.object, Phaser.Physics.ARCADE);
	this.object.body.immovable = true;
	this.object.body.allowGravity = false;

	// this.planet = this.game.add.sprite(this.game.width/2, this.game.height/2, 'planet');
	// this.planet.anchor.setTo(0.5, 0.5);
	// this.planet.smoothed = false;
	// this.game.physics.enable(this.planet, Phaser.Physics.ARCADE);
	// this.planet.body.allowGravity = false;
	//
	// this.planet1 = this.game.add.sprite(this.game.width/2-300, this.game.height/2, 'planet');
	// this.planet1.anchor.setTo(0.5, 0.5);
	// this.planet1.smoothed = false;
	// this.game.physics.enable(this.planet1, Phaser.Physics.ARCADE);
	// this.planet1.body.allowGravity = false;

	this.bulletPool = this.game.add.group();
	for (var i = 0; i < 20; i++) {
		var bullet = this.game.add.sprite(0, 0, 'bullet');
		this.bulletPool.add(bullet);
		bullet.anchor.setTo(0.5, 0.5);
		this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
		bullet.animations.add('fly');
		bullet.animations.play('fly', 10, true);
		bullet.kill();
	}
	// this.game.physics.arcade.gravity.y = 0;

	this.ground = this.game.add.group();
	for (var x = 0; x < this.game.width; x += 32) {
		var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
		this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
		groundBlock.body.immovable = true;
		groundBlock.body.allowGravity = false;
		this.ground.add(groundBlock);
	}

	this.explosionGroup = this.game.add.group();
	this.game.shoot = () => {
		setTimeout(()=>{
			console.log("shoot")
			this.hero.animations.play('fire');
			setTimeout(()=>{
				this.hero.animations.stop('fire');
				this.hero.frame = 0;
			}, 1000);
			var bullet = this.bulletPool.getFirstDead();
			bullet.revive();
			bullet.reset(50, this.game.height - 64);
			bullet.rotation = this.game.ANGLE;

			bullet.body.velocity.x = Math.cos(bullet.rotation) * this.game.SPEED;
			bullet.body.velocity.y = Math.sin(bullet.rotation) * this.game.SPEED;
		}, 500)
	}

};

GameState.prototype.update = function() {
	this.game.physics.arcade.gravity.y = 0;
	this.game.physics.arcade.collide(this.bulletPool, this.ground, function(bullet, ground) {
		this.getExplosion(bullet.x, bullet.y);
		this.game.failture();
		// this.game.launchSuccess();
		// Kill the bullet
		bullet.kill();
	}, null, this);

	this.game.physics.arcade.collide(this.bulletPool, this.object, function(mob, bullet) {
		bullet.kill();
		// Create an explosion
		this.getExplosion(bullet.x, bullet.y);
		// this.game.launchFail();
		this.game.success();
		// Kill the bullet
	}, null, this);

	this.bulletPool.forEachAlive((bullet) => {
		bullet.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x);

		// var gravity = new Phaser.Point(this.planet.body.x - bullet.body.x, this.planet.body.y - bullet.body.y);
		// gravity = gravity.normalize().multiply(1500, 1500);
		//
		// var gravity1 = new Phaser.Point(this.planet1.body.x - bullet.body.x, this.planet1.body.y - bullet.body.y);
		// gravity1 = gravity1.normalize().multiply(1500, 1500);

		var gravity = new Phaser.Point(0, 0);
		// gravity = gravity.add(gravity1.x, gravity1.y);
		gravity = gravity.add(0, this.game.GRAVITY);
		bullet.body.gravity = gravity;

		// if(bullet.body.x < 0 || bullet.body.x > this.game.width || bullet.body.y < 0 || bullet.body.y > this.game.height) {
		// if (bullet.body.x < 0 || bullet.body.x > this.game.width || bullet.body.y > this.game.height) {
		//
		// 	bullet.kill();
		// 	this.game.failture();
		// 	// this.game.launchSuccess();
		// }
	}, this);

	this.object.body.x = this.game.DISTANCE;
	// this.gun.rotation = this.game.ANGLE;

	// Aim the gun at the pointer.
	// All this function does is calculate the angle using
	// Math.atan2(yPointer-yGun, xPointer-xGun)

	// console.log(this.game.ANGLE + " " + this.gun.rotation);
	// if(-this.game.ANGLE - this.gun.rotation < 0.017) {     //1*Pi/180
	//     this.gun.rotation -= 0.017;
	// }


	// this.gun.rotation = this.game.physics.arcade.angleToPointer(this.gun);

	// Shoot a bullet
	// if (this.game.input.activePointer.isDown) {
	//     this.shootBullet();
	// }
	// this.game.shootBullet();
};

GameState.prototype.getExplosion = function(x, y) {
	// Get the first dead explosion from the explosionGroup
	var explosion = this.explosionGroup.getFirstDead();

	// If there aren't any available, create a new one
	if (explosion === null) {
		explosion = this.game.add.sprite(0, 0, 'explosion');
		explosion.anchor.setTo(0.5, 0.5);

		// Add an animation for the explosion that kills the sprite when the
		// animation is complete
		var animation = explosion.animations.add('boom', [
			0, 1, 2, 3
		], 60, false);
		animation.killOnComplete = true;

		// Add the explosion sprite to the group
		this.explosionGroup.add(explosion);
	}

	// Revive the explosion (set it's alive property to true)
	// You can also define a onRevived event handler in your explosion objects
	// to do stuff when they are revived.
	explosion.revive();

	// Move the explosion to the given coordinates
	explosion.x = x;
	explosion.y = y;

	// Set rotation of the explosion at random for a little variety
	explosion.angle = this.game.rnd.integerInRange(0, 360);

	// Play the animation
	explosion.animations.play('boom');

	// Return the explosion itself in case we want to do anything else with it
	return explosion;
};

function setVars(vars) {
	let pixelsInMeter = 32;
	if(vars.distance) this.DISTANCE = vars.distance*pixelsInMeter;
	if(vars.speed) this.SPEED = vars.speed*pixelsInMeter;
	if(vars.angle) this.ANGLE = -(Math.PI*vars.angle)/180;
	if(vars.gravity) this.GRAVITY = vars.gravity*pixelsInMeter;
}

function setCallbacks(success, failture) {
	this.success = success;
	this.failture = failture;
}

var game = {};

export default function createGame(width, height) {
	game = new Phaser.Game(width, height, Phaser.AUTO, 'gameWindow');
	game.setVars = setVars.bind(game);
	game.setCallbacks = setCallbacks.bind(game);

	game.state.add('game', GameState, true);
	return game;
};
