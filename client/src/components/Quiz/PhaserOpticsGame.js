import 'pixi';
import 'p2';
import Phaser from 'phaser';

var GameState = function(game) {};

GameState.prototype.preload = function() {
	this.game.load.image("ball", "/assets/gfx/ball.png");
	this.game.load.image("block", "/assets/gfx/block.png");
	this.game.load.spritesheet('hero', '/assets/Fire.png', 64, 64);
};

GameState.prototype.create = function() {
	// Set stage background color
	this.game.stage.backgroundColor = '#3498db';
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.FOCUS = 100;
	this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
  this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
  this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
  this.game.add.image(0, 0, this.bitmap);

	this.lens = this.game.add.sprite(this.game.width/2, this.game.height/2, 'block');
	this.lens.height = 200;
	this.lens.width = 16;
	this.lens.anchor.setTo(0.5, 0.5);

	let f1 = this.game.add.sprite(this.game.width/2 - this.FOCUS, this.game.height/2, 'block');
	f1.anchor.setTo(0.5, 0.5);
	f1.height = 32;
	f1.width = 4;

	let f2 = this.game.add.sprite(this.game.width/2 + this.FOCUS, this.game.height/2, 'block');
	f2.anchor.setTo(0.5, 0.5);
	f2.height = 32;
	f2.width = 4;

	// this.mirror = this.game.add.sprite(this.game.width/2, 3*this.game.height/4, 'block');
	// this.mirror.height = 100;
	// this.mirror.width = 16;
	// this.mirror.anchor.setTo(0.5, 0.5);

	this.ball = this.game.add.sprite(this.game.width/2, this.game.height/2, 'ball');
	this.ball.anchor.setTo(0.5, 0.5);
	// this.ball.width = 2;

	this.shadowBall = this.game.add.sprite(0, 0, 'ball');
	this.shadowBall.anchor.setTo(0.5, 0.5);
	this.shadowBall.alpha = 0.5;
	// this.shadowBall.width = 2;


	this.game.input.activePointer.x = this.game.width/2;
  this.game.input.activePointer.y = this.game.height/2;
};

GameState.prototype.update = function() {
	// this.ball.angle += 1;
	// this.shadowBall.angle += 1;
	this.ball.x = this.game.input.activePointer.x;
  this.ball.y = this.game.input.activePointer.y;

	this.bitmap.context.clearRect(0, 0, this.game.width, this.game.height);
	this.bitmap.context.beginPath();
	let line = new Phaser.Line(this.ball.x, this.ball.y, this.game.width, this.ball.y);

	this.bitmap.context.moveTo(this.lens.x, 0);
	this.bitmap.context.lineTo(this.lens.x, this.game.height);

	this.bitmap.context.moveTo(0, this.lens.y);
	this.bitmap.context.lineTo(this.game.width, this.lens.y);

  this.bitmap.context.moveTo(this.ball.x, this.ball.y);
	if(line.start.y > this.lens.top && line.start.y < this.lens.bottom) {
		this.bitmap.context.lineTo(this.lens.left, this.ball.y);
		this.bitmap.context.moveTo(this.lens.x, line.start.y);
		let distToLens = this.lens.x - line.start.x;
		let distToImage = (this.FOCUS*distToLens)/(distToLens-this.FOCUS);
		this.shadowBall.x = this.lens.x + distToImage;
		let k = distToImage/distToLens;
		this.shadowBall.y = this.lens.y+(this.lens.y-this.ball.y)*k;
		this.shadowBall.width = k * this.ball.width;
		this.shadowBall.height = k * this.ball.height;
		this.bitmap.context.lineTo(this.shadowBall.x, this.shadowBall.y);

		this.bitmap.context.moveTo(this.ball.x, this.ball.y);
		let slope = (this.game.height/2 - this.ball.y)/(this.game.width/2 - this.ball.x) - Math.PI/2;
		// this.bitmap.context.lineTo(1000, slope*1000);
	} else {
		this.bitmap.context.lineTo(this.game.width, this.ball.y);
	}

  this.bitmap.context.stroke();
	this.bitmap.dirty = true;
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
