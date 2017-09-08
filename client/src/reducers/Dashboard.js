import {GET_WORLDS, GET_USERDATA, GET_TOPPLAYERS} from '../constants/Dashboard';

const initialState = {
	worlds: [],
	userdata: {},
	top: []
}

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_WORLDS:
			return {
				...state,
				worlds: action.payload.worlds
			};
			break;

		case GET_USERDATA:
			return {
				...state,
				userdata: action.payload.data
			};
			break;

		case GET_TOPPLAYERS:
			return {
				...state,
				top: action.payload.data
			};
			break;

		default:
			return state;
	}
}
