import { combineReducers } from 'redux';
import Quiz from './Quiz';
import App from './App';
import Chat from './Chat';
import Dashboard from './Dashboard';
import World from './World';
import Quest from './Quest';



import { routerReducer } from 'react-router-redux';

export default combineReducers({
    Quiz,
    App,
    Chat,
    Dashboard,
		World,
		Quest,
    routing: routerReducer
});
