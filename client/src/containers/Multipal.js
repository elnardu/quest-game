import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ChoiceGame from '../components/Quiz/ChoiceGame';
import Info from '../components/Quiz/Info';
import Task from '../components/Quiz/Task';

import * as actions from '../actions/Quiz';

class Multipal extends Component {
  render() {
    const actions = this.props.actions;
    const quiz = this.props.quiz.quiz;
    const tries = this.props.quiz.tries;
    const vars = this.props.quiz.vars;
		const success = this.props.quiz.success;

    return (
      <div>
        <div className="all-60 quiz-container">
          <Info quiz={quiz} success={success} tries={tries} actions={actions} />
          <ChoiceGame quiz={quiz} vars={vars} actions={actions} />
        </div>
        <div className="all-40 quiz-container">
          <Task quiz={quiz} success={success}/>
        </div>
      </div>
    );
  }
}

export default Multipal;
