import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/Quiz/ChoiceGame.css';

class ChoiceGame extends Component {
  constructor(props) {
      super(props);
			this.actions = this.props.actions;
			this.quiz = this.props.quiz;
			this.vars = this.props.vars;
  }
	handleAnsClick(index) {
		this.actions.newTry({ans: index});
		if(typeof this.quiz.question.answer === "string"){
			if(index == this.quiz.question.answer) {
				this.actions.success();
				return;
			}
		} else {
			if(this.quiz.question.answer.includes(index.toString())){
				this.actions.success();
				return;
			}
		}
		this.actions.failture();
	}
  render() {
		this.actions = this.props.actions;
		this.quiz = this.props.quiz;
		this.vars = this.props.vars;
		var answers = this.quiz.question;

		var ansKeys = Object.keys(answers);
		var list = [];
		ansKeys.forEach((el, i)=>{
			if(el == "answer") return;
			let reactEl = (<li onClick={this.handleAnsClick.bind(this, el)} key={i}>{el+". "+answers[el]}</li>);
			list.push(reactEl);
		});

    return (
      <div className="choicegameWindow">
					<ol>
						{list}
					</ol>
      </div>
    );
  }
}

export default ChoiceGame;
