import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';
import {useRouterHistory} from 'react-router'
import {createHistory} from 'history';
// const history = useRouterHistory(createHistory)({
//   basename: '/app'
// });
const history = browserHistory;

import App from './containers/App';
import Login from './containers/Login';
import Quiz from './containers/Quiz';
import Dashboard from './containers/Dashboard';
import World from './containers/World';

import './styles/index.css';
import './styles/transitions.css';
import configureStore from './store/configureStore';

global.PIXI = require('../node_modules/phaser/build/custom/pixi.js');
global.p2 = require('../node_modules/phaser/build/custom/p2.js');
global.Phaser = require('../node_modules/phaser/build/custom/phaser-split.js');

import socketio from './SocketIo';
import {syncStoreWithQuestManager} from './QuestManager';

export const store = configureStore();
const routerHistory = syncHistoryWithStore(history, store);
syncStoreWithQuestManager(store);

if (store.getState().App.token)
	socketio.connect();

render(
	<Provider store={store}>
	<Router history={routerHistory}>
		<Route path="/app/" component={App}>
			<IndexRedirect to="login"/>

			<Route path="/app/login" component={Login}/>
			<Route path="/app/dashboard" component={Dashboard}/>
			<Route path="/app/quiz/:quizId" component={Quiz}/>
			<Route path="/app/world/:worldId" component={World}/>
		</Route>
	</Router>
</Provider>, document.getElementById('root'));
