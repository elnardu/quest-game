import {
	WORLD_ENTER,
	WORLD_RETURN,
	WORLD_TEXT_DISPLAY,
	WORLD_TEXT_CLEAR,
	WORLD_EXIT
} from "../constants/World";

const initialState = {
	displayText: "",
	worldId: null,
	isFromQuest: false,
	lastPos: {
		x: undefined,
		y: undefined
	},
	lockRender: false
}

export default function(state = initialState, action) {
	switch(action.type){
		case WORLD_ENTER:
			return {
				...state,
				worldId: action.payload.worldId
			};
			break;
		case WORLD_EXIT:
			return {
				...state
			};
			break;
		case WORLD_RETURN:
			return {
				...state
			};
			break;
		case WORLD_TEXT_DISPLAY:
			return {
				...state,
				displayText: action.payload.text,
				isFromQuest: action.payload.isFromQuest
			};
			break;
		case WORLD_TEXT_CLEAR:
			return {
				...state,
				displayText: null
			};
			break;
		default:
				return state;
	}
}
