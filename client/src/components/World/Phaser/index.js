import Phaser from 'phaser';

import Boot from './Boot';
import Preload from './Preload';
import Game from './Game';


export default function createGame(width, height){
	var game = new Phaser.Game(width, height, Phaser.AUTO, "gameWindow-world");
	game.state.add('Boot', Boot);
	game.state.add('Preload', Preload);
	game.state.add('Game', Game);

	game.state.start('Boot');
	return game;
}
