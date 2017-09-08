import {CHAT_NEW_MESSAGE, CHAT_MT_USER} from '../constants/Chat';

import socketio from '../SocketIo';

export function sendMessage(mes) {
	socketio.sendMessage(mes);
	return {
		type: CHAT_NEW_MESSAGE,
		payload: {
		    message: mes
		}
	}
	// return {
	// 	type: 'NOTHING'
	// }
}
