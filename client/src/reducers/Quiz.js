import {QUIZ_DATA, QUIZ_INIT, QUIZ_SUCCESS, QUIZ_TRY, QUIZ_FAILTURE} from '../constants/Quiz';

const initialState = {
	quiz: {
		question: {},
		text: "",
		points: 0,
		type: "",
		title: "",
		nextQuiz: "",
		maxTries: 1
	},
	id: "",
	fromWorld: "",
	success: undefined,
	tries: 0,
	vars: {},
	activeQuest: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case QUIZ_INIT:
			return {
				...state,
				fromWorld: action.payload.fromWorld,
				id: action.payload.id,
				activeQuest: action.payload.activeQuest,
				quiz: {},
				success: undefined,
				tries: 0,
				vars: {}
			};

		case QUIZ_DATA:
			return {
				...state,
				quiz: action.payload,
				id: action.payload._id
			};

		case QUIZ_TRY:
			return {
				...state,
				success: undefined,
				tries: state.tries + 1,
				vars: action.payload
			};

		case QUIZ_SUCCESS:
			return {
				...state,
				success: true
			};

		case QUIZ_FAILTURE:
			return {
				...state,
				success: false
			};

		default:
			return state;
	}
}
