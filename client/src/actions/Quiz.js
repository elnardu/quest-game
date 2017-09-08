import {QUIZ_DATA, QUIZ_INIT, QUIZ_SUCCESS, QUIZ_TRY, QUIZ_FAILTURE} from '../constants/Quiz';

import {WORLD_RETURN} from '../constants/World';

import {QUEST_STEP_SUCCESS} from '../constants/Quest';

import {api} from "./App";
import {store} from '../index';
import {push} from 'react-router-redux';

export function getQuizData(id) {
	// var id = id || store.getState().Quiz.id;
	console.log(id);
	return (dispatch) => {
		dispatch(api('quiz/get', {
			id: id
		}, (data) => {
			console.log(data);
			dispatch({type: QUIZ_DATA, payload: data.quiz});
		}));
	}
}

export function success() {
	const id = store.getState().Quiz.id;
	const fromWorld = store.getState().Quiz.fromWorld;
	const activeQuest = store.getState().Quiz.activeQuest;

	return (dispatch) => {
		dispatch({type: QUIZ_SUCCESS});
		dispatch(api('quiz/success', {
			id: id
		}, (data) => {
			setTimeout(() => {
				if (activeQuest) {
					dispatch({type : QUEST_STEP_SUCCESS});
				} else {
					dispatch(push('/app/world/' + fromWorld));
					dispatch({
						type: WORLD_RETURN,
						payload: {
							success: true
						}
					});
				}
			}, 1000);  //time for displaying success message
		}));
	}
}

export function failture() {
	return {type: QUIZ_FAILTURE}
}

export function newTry(vars) {
	return {type: QUIZ_TRY, payload: vars}
}
