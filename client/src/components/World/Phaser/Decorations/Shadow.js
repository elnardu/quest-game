module.exports = Shadow = function(game) {
	this.game = game;
	this.LIGHT_RADIUS = 100;

	this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);
	this.lightSprite = this.game.add.image(0, 0, this.shadowTexture);

	this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

	this.lights = [];
	// console.log(Phaser.Point);
	// console.log(this.shadowTexture);
};

Shadow.prototype.update = function() {
	this.shadowTexture.context.fillStyle = 'rgb(100, 100, 100)';
	// this.shadowTexture.context.fillStyle = '#000000';

    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

    this.lights.forEach(function(light) {
        var radius = this.LIGHT_RADIUS + this.game.rnd.integerInRange(1,10);

        var gradient = this.shadowTexture.context.createRadialGradient(
                light.x, light.y, this.LIGHT_RADIUS * 0.75,
                light.x, light.y, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        this.shadowTexture.context.beginPath();
        this.shadowTexture.context.fillStyle = gradient;
        this.shadowTexture.context.arc(light.x, light.y, radius, 0, Math.PI*2);
        this.shadowTexture.context.fill();
    }, this);

    this.shadowTexture.dirty = true;
};

Shadow.prototype.addLight = function(x, y) {
	var p = new Phaser.Point(x, y);
	this.lights.push(p);
};