import {store} from './index';
import io from 'socket.io-client';

import {SOCKET_CONNECTED, SOCKET_DISCONNECTED} from './constants/App';

import {CHAT_CONNECTED, CHAT_DISCONNECTED, CHAT_NEW_MESSAGE} from './constants/Chat';

class Socketio {
	constructor() {
		// this.socket = io('localhost:4000');
	}
	connect() {
		// this.socket = io.connect('http://localhost:4000');
		this.socket = io.connect('/');
		// this.socket = io.connect('http://elnard.synology.me:4000');
		this.connected = false;

		this.socket.on('connect', () => {
			this.socket.emit('authenticate', {token: store.getState().App.token}).on('authenticated', () => {
				store.dispatch({type: SOCKET_CONNECTED});
				this.connected = true;
			}).on('unauthorized', (msg) => {
				console.log("unauthorized: " + JSON.stringify(msg.data));
			});
		});

		this.socket.on('disconnect', () => {
			store.dispatch({type: SOCKET_DISCONNECTED});
		});

		this.socket.on('chatMessage', (mes) => {
			store.dispatch({
				type: CHAT_NEW_MESSAGE,
				payload: {
					message: mes
				}
			});
		});
	}
	sendMessage(mes) {
		this.socket.emit('chatMessage', mes);
	}
	sendCoords(coords) {
		this.socket.emit('coords', coords);
	}
	receiveCoords(func) {
		this.socket.on('coords', (coords) => {
			func(coords);
		});
	}
}

var socketio = new Socketio();
export default socketio;
