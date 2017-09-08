import Phaser from 'phaser';

import level from '!!file?name=static/media/[name].[hash:8].[ext]!../../../../public/assets/map1.json';
import tilesheet from '../../../../public/assets/tilesheet.png';
import player from '../../../../public/assets/man1.png';
// import mage from '../../../../public/assets/mage.png';
import mage from '../../../../public/assets/Priestess.png';
import spirit from '../../../../public/assets/spirit.png';
import mob from '../../../../public/assets/Mob1.png';
import elizabeth from '../../../../public/assets/elizabeth.png';
import trade1 from '../../../../public/assets/Trade1.png';
import trade2 from '../../../../public/assets/Trade2.png';
import trade3 from '../../../../public/assets/Trade3.png';
import oldman from '../../../../public/assets/OldMan.png';
import dwarf from '../../../../public/assets/Dwarf.png';
import client from '../../../../public/assets/Client.png';

class Preload extends Phaser.State {
	preload() {
		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		// this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5);

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		var fontStyle = {
			font: "30px Pixar",
			fill: "#000000",
			align: "center"
		};
		var txtTitle = this.game.add.text(this.game.world.centerX, this.game.world.centerY-50, "Загрузка...", fontStyle);


		//	Here we load the rest of the assets our game needs.
		console.log(level);
		this.load.tilemap('level', level, null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tilesheet', tilesheet);
		this.load.spritesheet('player', player, 64, 64);
		this.load.spritesheet('mage', mage, 64, 64);
		this.load.spritesheet('spirit', spirit, 64, 64);
		this.game.load.image('mob', mob);
		this.game.load.image('elizabeth', elizabeth);
		this.game.load.image('trade1', trade1);
		this.game.load.image('trade2', trade2);
		this.game.load.image('trade3', trade3);
		this.game.load.image('oldman', oldman);
		this.game.load.image('dwarf', dwarf);
		this.game.load.image('client', client);

		console.info('Preload');
	}

	create() {
		this.game.time.events.add(2000, function () {
			this.state.start('Game');
		}, this);
	}
}

export default Preload;
