import Phaser from 'phaser';

import Entity from './Entity';
import Player from './Player';

import socketio from '../../../SocketIo';
import {store} from '../../../index';
import {push} from 'react-router-redux';
import {
	WORLD_TEXT_DISPLAY
} from '../../../constants/World';
import {QUIZ_INIT} from '../../../constants/Quiz';
import {QUEST_START} from '../../../constants/Quest';
import {
	startQuest,
	stepSuccess
} from '../../../QuestManager';

class Game extends Phaser.State {
	preload() {

	}
	create() {
		var self = this,
			result;
		//-----------
		//	Variables
		//-----------
		this.MAX_SPEED = 300;
		this.DRAG = 300;

		this.players = {};
		this.entities = [];

		//--------------
		//	Key bindings
		//--------------
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		// TODO: solve problem in Chat container and bring back ENTER key

		this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.ENTER);
		this.enterKey.onDown.add(this.handleEnterKey, this);
		// this.game.onBlur.add(()=>{
		// 	console.log("Focus lost");
		// 	this.game.input.enabled = false;
		// });
		// this.game.onFocus.add(()=>{
		// 	this.game.input.enabled = true;
		// });

		//------------
		//	Map setup
		//------------
		this.map = this.game.add.tilemap('level');
		this.map.addTilesetImage('tilesheet', 'tilesheet');
		this.backgroundlayer = this.map.createLayer('backgroundLayer');
		this.backgroundlayer2 = this.map.createLayer('backgroundLayer2');
		this.backgroundlayer3 = this.map.createLayer('backgroundLayer3');
		this.blockedLayer = this.map.createLayer('blockedLayer');
		this.map.setCollisionBetween(1, 50, true, 'blockedLayer');
		this.blockedLayer.alpha = 0;
		//resizes the game world to match the layer dimensions
		this.backgroundlayer.resizeWorld();

		//---------------
		//	Entities init
		//---------------

		result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
		this.player = new Player(this.game, localStorage.username, result[0].x, result[0].y, 'player', {mainPlayer: true});
		// this.player = new Player(this.game, localStorage.username, result[0].x, result[0].y, 'player', {mainPlayer: true});

		result = this.findObjectsByType('entity', this.map, 'objectsLayer');
		for (var i = result.length - 1; i >= 0; i--) {
			// this.entities.push(new Entity(this.game, result[i].properties.name, result[i].x, result[i].y, 'player'));
			this.entities.push(new Entity(this.game, result[i].properties.name, result[i].x, result[i].y, result[i].properties.texture, result[i].properties));
			// this.entities.push(new Entity(this.game, '', result[i].x, result[i].y, 'mob'));
		}
		// this.entities.push(new Entity(this.game, null, 100, 100, 'player', {quest: "588383ebbe221e3ac25bb48b"}));
		console.log(this.entities);

		this.handlePlayersCoords = this.handlePlayersCoords.bind(this);
		this.handleEntityOverlap = this.handleEntityOverlap.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
		this.initQuest = this.initQuest.bind(this);
		this.initQuiz = this.initQuiz.bind(this);
		socketio.receiveCoords(this.handlePlayersCoords);
		console.info('Phaser state: Game');
	}
	findObjectsByType(type, map, layer) {
		var result = [];
		map.objects[layer].forEach(function(element) {
			if (element.properties.type === type) {
				element.y -= map.tileHeight;
				result.push(element);
			}
		});
		return result;
	}
	handlePlayersCoords(coords) {
		if (this.players[coords.username]) {
			this.players[coords.username].x = coords.x;
			this.players[coords.username].y = coords.y;
		} else {
			this.players[coords.username] = new Player(this.game, coords.username, coords.x, coords.y, 'player');
		}
	}
	handleEntityOverlap(player, entity) {
		let quiz = entity.linkedQuiz;
		let quest = entity.linkedQuest;
		if(quiz || quest){
			this.game.lockRender = true;
			let dy = this.player.body.deltaY();
			let dx = this.player.body.deltaX();
			if(dy < 0){
				this.player.body.y += 32;
			} else if(dy > 0){
				this.player.body.y -= 32;
			}
			if(dx < 0){
				this.player.body.x += 32;
			} else if(dx > 0){
				this.player.body.y -= 32;
			}
			if(quest) this.initQuest(quest);
			if(quiz) this.initQuiz(quiz);
		}

	}
	initQuest(id) {
		let data = {
			fromWorld: this.game.WORLD_ID,
			x: this.player.body.x,
			y: this.player.body.y
		}
		startQuest(id, data);
	}
	initQuiz(id) {
		store.dispatch({
			type: QUIZ_INIT,
			payload: {
				fromWorld: this.game.WORLD_ID,
				id: id
			}
		});
		store.dispatch(push('/app/quiz/' + quiz));
	}
	showMessage(text) {
		store.dispatch({
			type: WORLD_TEXT_DISPLAY,
			payload: {
				text: text,
				isFromQuest: false
			}
		});
	}
	handleEnterKey() {
		this.game.lockRender = false;
		if(store.getState().World.isFromQuest) {
			this.showMessage("");
			stepSuccess();
		} else {
			this.showMessage("");
		}
	}
	update() {
		// this.game.debug.text("FPS: " + this.game.time.fps, 20, 14, "#ffffff"); //fps counter
		// this.game.debug.text("FPS: " + 61, 20, 14, "#ffffff"); //fps counter

		if(this.game.X && this.game.Y){
			this.player.body.x = this.game.X;
			this.player.body.y = this.game.Y;
			this.game.X = null;
			this.game.Y = null;
		}

		this.game.physics.arcade.collide(this.player, this.blockedLayer);
		// this.game.physics.arcade.overlap(this.player, this.entities, this.questManager.checkEntity, null, this.questManager);
		this.game.physics.arcade.overlap(this.player, this.entities, this.handleEntityOverlap);
		if (!this.player.body)
			return;
		this.player.body.velocity.y = 0;
		this.player.body.velocity.x = 0;

		if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.player.body.velocity.y -= this.MAX_SPEED;
		} else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.player.body.velocity.y += this.MAX_SPEED;
		} else {
			this.player.body.velocity.y = 0;
		}

		if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.player.body.velocity.x -= this.MAX_SPEED;
		} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.player.body.velocity.x += this.MAX_SPEED;
		} else {
			this.player.body.velocity.x = 0;
		}

		if (this.player.deltaX || this.player.deltaY) {
			socketio.sendCoords({x: this.player.x, y: this.player.y});
		}
	}
}

export default Game;
