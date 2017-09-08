import { store } from './index';
import { push } from 'react-router-redux';
import { api } from './actions/App';

import {
	QUIZ_INIT
} from './constants/Quiz';
import {
	WORLD_TEXT_DISPLAY
} from './constants/World';
import {
	QUEST_START,
	QUEST_DATA,
	QUEST_END,
	QUEST_STEP_SUCCESS
} from './constants/Quest';

export function startQuest(id, data) {
	let fromWorld = data.fromWorld;
	let coords = {
		x: data.x,
		y: data.y
	};
	console.info("QuestManager:", "startQuest", "id:", id, "fromWorld:", fromWorld);
	store.dispatch({
		type: QUEST_START,
		payload: {
			id: id,
			fromWorld: fromWorld,
			worldCoords: coords
		}
	});
	let apiReq = api('quest/get', {
		id: id
	}, (data)=>{
		console.log(data);
		store.dispatch({
			type: QUEST_DATA,
			payload: {
				quest: data.quest
			}
		});
	});
	store.dispatch(apiReq);
}

export function stepSuccess() {
	store.dispatch({
		type: QUEST_STEP_SUCCESS
	});
}

function handleChange(prev, curr){
	if(curr.Quest.currentStep > curr.Quest.totalSteps) {
		store.dispatch({
			type: QUEST_END
		});
		store.dispatch(push('/app/world/'+curr.Quest.fromWorld));

	} else if(curr.Quest.currentStep != prev.Quest.currentStep) {
		if(!curr.Quest.quest) return;
		let stage = curr.Quest.quest.stages[curr.Quest.currentStep.toString()];

		if(stage.type == "quiz"){
			store.dispatch({
				type: QUIZ_INIT,
				payload: {
					id: stage.quizId,
					activeQuest: true
				}
			});
			store.dispatch(push('/app/quiz/'+stage.quizId));
		} else if(stage.type == "display") {
			store.dispatch({
				type: WORLD_TEXT_DISPLAY,
				payload: {
					text: stage.text,
					isFromQuest: true
				}
			});
			store.dispatch(push('/app/world/'+curr.Quest.fromWorld));
		}
	}
}


export function syncStoreWithQuestManager(store){
	let currentState = store.getState();
	function handleStoreChange() {
		let prevState = currentState;
		currentState = store.getState();
		handleChange(prevState, currentState);
	}
	store.subscribe(handleStoreChange);
}
