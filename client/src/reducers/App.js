import {
	USER_LOGIN,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILTURE,

	SOCKET_CONNECTED,
	SOCKET_DISCONNECTED,

  GET_USERDATA,

	API_REQUEST,
	API_REQUEST_SUCCESS,
	API_REQUEST_FAILTURE
} from '../constants/App';

const initialState = {
	fetching: false,
	error: false,
	logged: false,
	sockedConnected: false,
	admin: false,
	username: undefined,
	token: undefined,
  userdata: {}
}

if (localStorage.logged) {
	initialState.username = localStorage.username;
	initialState.token = localStorage.token;
	initialState.logged = true;
} else {
	initialState.username = undefined;
	initialState.token = undefined;
}

export default function(state = initialState, action) {
	switch (action.type) {
		case USER_LOGIN:
			return {
				...state,
				fetching: true,
				username: action.payload.username,
				error: false
			};
			break;

		case USER_LOGIN_SUCCESS:
			return {
				...state,
				fetching: false,
				token: action.payload.token,
				admin: action.payload.admin,
				error: false,
				logged: true
			};
			break;

		case USER_LOGIN_FAILTURE:
			return {
				...state,
				fetching: false,
				error: action.payload.error
			};
			break;

		case SOCKET_CONNECTED:
			return {
				...state,
				sockedConnected: true
			};
			break;

		case SOCKET_DISCONNECTED:
			return {
				...state,
				sockedConnected: false
			};
			break;

		case API_REQUEST:
			return {
				...state,
				fetching: true,
				error: false
			};
			break;

		case API_REQUEST_SUCCESS:
			return {
				...state,
				fetching: false,
				error: false
			};
			break;

		case API_REQUEST_FAILTURE:
			return {
				...state,
				fetching: false,
				error: action.payload.error
			};
			break;

		default:
			return state;
	}
}
