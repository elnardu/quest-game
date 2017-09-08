import {CHAT_NEW_MESSAGE, CHAT_CONNECTED, CHAT_DISCONNECTED, CHAT_CLEAR, CHAT_MT_INFO} from '../constants/Chat';

const initialState = {
	chatId: undefined,
	messages: [
	],
	connected: false
}

export default function(state = initialState, action) {
	switch (action.type) {
		case CHAT_CONNECTED:
			return {
				...state,
				connected: true,
				messages: state.messages.push({
					type: CHAT_MT_INFO,
					body: "Подключенно к серверу: " + action.payload.chatId
				})
			};
			break;

		case CHAT_NEW_MESSAGE:
			var messages = state.messages;
			if (messages.length > 30) {
				messages.splice(0, 1);
			}
			messages.push(action.payload.message);
			return {
				...state,
				messages: messages
			};
			break;

		case CHAT_DISCONNECTED:
			return {
				...state,
				connected: false,
				messages: state.messages.push({type: CHAT_MT_INFO, body: "Отключенно от сервера", chatId: undefined})
			};
			break;

		case CHAT_CLEAR:
			return {
				...state,
				messages: []
			};
			break;

		default:
			return state;
	}
}
