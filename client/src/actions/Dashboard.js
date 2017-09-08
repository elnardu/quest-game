import {GET_WORLDS, GET_USERDATA, GET_TOPPLAYERS} from '../constants/Dashboard';

import {api} from './App';
import {push} from 'react-router-redux';

export function getWorlds() {
	return (dispatch) => {
		dispatch(api('world/get', {}, (data) => {
			dispatch({
				type: GET_WORLDS,
				payload: {
					worlds: data.worlds
				}
			});
		}));
	};
}


export function getTopPlayers() {
	return (dispatch) => {
		dispatch(api('user/top', {}, (data) => {
			dispatch({
				type: GET_TOPPLAYERS,
				payload: {
					data: data.data
				}
			});
		}));
	};
}

export function getMyData() {
	return (dispatch) => {
		dispatch(api('user/getMe', {}, (data) => {
			dispatch({
				type: GET_USERDATA,
				payload: {
					data: data.data
				}
			});
		}));
	};
}

export function enterWorld(id) {
	return push('/app/world/' + id);
}
