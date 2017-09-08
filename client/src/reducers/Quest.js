import {
	QUEST_START,
	QUEST_DATA,
	QUEST_STEP_SUCCESS,
	QUEST_END
} from '../constants/Quest';

const initialState = {
	currentStep: 0,
	totalSteps: 10000,
	quest: null,
	id: null,
	fromWorld: null,
	worldCoords: {
		x: undefined,
		y: undefined
	}
}

export default function(state = initialState, action){
	switch(action.type) {
		case QUEST_START:
			return {
				...state,
				id: action.payload.id,
				fromWorld: action.payload.fromWorld,
				worldCoords: action.payload.worldCoords
			};
			break;
		case QUEST_DATA:
			return {
				...state,
				quest: action.payload.quest,
				currentStep: 1,
				totalSteps: Object.keys(action.payload.quest.stages).length
			};
			break;
		case QUEST_STEP_SUCCESS:
			return {
				...state,
				currentStep: state.currentStep + 1
			};
			break;
		case QUEST_END:
			return {
				...state,
				id: null,
				quest: null,
				totalSteps: null,
				currentStep: null
			};
			break;
		default:
			return state
	}
}
