import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from 'react-router';

import '../styles/World/World.css';

import Game from '../components/World/Game';
import Chat from '../components/Chat';

class World extends Component {
	render() {
		let display = this.props.World.displayText
			? <div className="world-display">{this.props.World.displayText}</div>
			: null;
		return (
			<ReactCSSTransitionGroup transitionName="containerTransition" transitionAppear={true} transitionAppearTimeout={2500} transitionEnterTimeout={2500} transitionLeaveTimeout={1000}>
				<div className="app">
					<div className="all-75 world-container">
						<Link to='/app/dashboard' className="todashboard">В меню</Link>
						{display}
						<Game worldId={this.props.params.worldId} worldCoords={this.props.Quest.worldCoords}/>
					</div>
					<div className="all-25 world-container">
						<Chat/>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

function mapStateToProps(state) {
	return {World: state.World,
		Quest: state.Quest
	}
}

export default connect(mapStateToProps)(World);
// export default World;
