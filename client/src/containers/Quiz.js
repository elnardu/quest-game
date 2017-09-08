import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import '../styles/Quiz/Quiz.css';

import * as actions from '../actions/Quiz';

import Multipal from './Multipal';
import Cannon from './Cannon';
import Optics from './Optics';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {QUIZ_TYPE_CANNON, QUIZ_TYPE_MULTIPAL, QUIZ_TYPE_OPTICS, QUIZ_TYPE_TERMO} from '../constants/Quiz';

class Quiz extends Component {
	constructor(props) {
		super(props);

	}
	componentWillMount() {
		this.props.actions.getQuizData(this.props.params.quizId);
	}
	componentWillUpdate(newProps) {
		if (this.props.params.quizId != newProps.params.quizId)
			this.props.actions.getQuizData(newProps.params.quizId);
		}
	render() {
		const actions = this.props.actions;
		const quiz = this.props.Quiz;

		var c = null;
		if (quiz.quiz.type == QUIZ_TYPE_CANNON) {
			c = <Cannon quiz={quiz} actions={actions} key={quiz.currentStep}/>;
		} else if (quiz.quiz.type == QUIZ_TYPE_MULTIPAL) {
			c = <Multipal quiz={quiz} actions={actions} key={quiz.currentStep}/>;
		} else if (quiz.quiz.type == QUIZ_TYPE_OPTICS) {
			c = <Optics quiz={quiz} actions={actions} key={quiz.currentStep}/>;
		} else if (quiz.quiz.type == QUIZ_TYPE_TERMO) {
			// c = <Termo quiz={quiz} actions={actions} key={quiz.currentStep}/>;
		}

		return (
			<div className="app">
				<ReactCSSTransitionGroup transitionName="containerTransition" transitionEnterTimeout={2000} transitionLeaveTimeout={500}>
					{c}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {Quiz: state.Quiz}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
