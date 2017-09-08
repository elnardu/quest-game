import {
	USER_LOGIN,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILTURE,

	API_REQUEST,
	API_REQUEST_SUCCESS,
	API_REQUEST_FAILTURE
} from '../constants/App';

import socketio from '../SocketIo';

import {store} from '../index';
import {push} from 'react-router-redux';
import axios from '../../node_modules/axios';

export function api(method, obj, callback) {
	console.info("New api request:", "/api/" + method);
	return (dispatch) => {
		dispatch({type: API_REQUEST})
		obj.token = store.getState().App.token;
		axios({
			method: 'post',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			// url: 'http://localhost:4000/api/' + method,
			// url: 'http://elnard.synology.me:4000/api/' + method,
			url: '/api/' + method,
			data: obj
		}).then((res) => {
			if (res.data.success) {
				console.log(res.data);
				dispatch({type: API_REQUEST_SUCCESS});

				callback(res.data);
			} else {
				dispatch({
					type: API_REQUEST_FAILTURE,
					payload: {
						error: res.data.err
					}
				});
			}
		}).catch((err) => {
			if (err.message == "Network Error")
				err = "Ошибка соединения";
			dispatch({
				type: API_REQUEST_FAILTURE,
				payload: {
					error: err.toString()
				}
			});
		});
	};
}

export function login(payload) {
	return (dispatch) => {
		dispatch({type: USER_LOGIN, payload: payload})

		localStorage.username = payload.username;

		let obj = {
			username: payload.username,
			password: payload.password
		}

		axios({
			method: 'post',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			// url: 'http://elnard.synology.me:4000/signin',
			// url: 'http://localhost:4000/signin',
			url: '/auth/signin',
			data: obj
		}).then((res) => {
			if (res.data.success) {
				console.log(res.data);
				dispatch({
					type: USER_LOGIN_SUCCESS,
					payload: {
						token: res.data.token,
						admin: res.data.admin
					}
				});
				socketio.connect();
				localStorage.token = res.data.token;
				localStorage.logged = true;

				dispatch(push('/app/dashboard'));
			} else {
				dispatch({
					type: USER_LOGIN_FAILTURE,
					payload: {
						error: res.data.error
					}
				});
			}
		}).catch((err) => {
			if (err.message == "Network Error")
				err = "Ошибка соединения";
			dispatch({
				type: USER_LOGIN_FAILTURE,
				payload: {
					error: err.toString()
				}
			});
		});

	};
}
