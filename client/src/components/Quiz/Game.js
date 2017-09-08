import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../../styles/Quiz/Game.css';

import PhaserGame from '../../components/Quiz/PhaserGame';

class Game extends Component {
	constructor(props) {
		super(props);

	}
	render() {
		return (
			<div className="gameWindow" id="gameWindow" ref="gameWindow">
				{/* <p>Игра будет тута</p> */}
			</div>
		);
	}
	componentDidMount() {
		var width = ReactDOM.findDOMNode(this.refs.gameWindow).offsetWidth;
		var height = ReactDOM.findDOMNode(this.refs.gameWindow).offsetHeight;
		this.game = new PhaserGame(width, height);
		this.game.setCallbacks(this.props.actions.success, this.props.actions.failture);
		this.game.setVars(this.props.quiz.question.vars);
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.vars !== this.props.vars){
			this.game.setVars(nextProps.vars);
			// for (var i = 0; i < 3; i++) {
			// 	setTimeout(()=>{
			// 		this.game.shoot();
			// 	}, 500*i);
			// }
			this.game.shoot();
			return false;
		}
		return true;
	}
}

export default Game;
