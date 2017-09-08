import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Editor from '../components/Quiz/Editor';
import OpticsGame from '../components/Quiz/OpticsGame';
import Info from '../components/Quiz/Info';
import Task from '../components/Quiz/Task';

import * as actions from '../actions/Quiz';

class Optics extends Component {
	render() {
		const actions = this.props.actions;
		const quiz = this.props.quiz.quiz;
		const tries = this.props.quiz.tries;
		const success = this.props.quiz.success;
		const vars = this.props.quiz.vars;

		return (
			<div>
				<div className="all-60 quiz-container">
					<Info quiz={quiz} success={success} tries={tries} actions={actions}/>
					<OpticsGame quiz={quiz} vars={vars} actions={actions}/>
				</div>
				<div className="all-40 quiz-container">
					<Task quiz={quiz}/>
					<Editor quiz={quiz} actions={actions}/>
				</div>
			</div>
		);
	}
}

export default Optics;
