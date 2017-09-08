import React, {Component} from 'react';
import '../../styles/Quiz/Task.css';
import {nameBindings} from '../../constants/Quiz';

class Task extends Component {
	render() {
		let successText = this.props.quiz.successText
			? this.props.quiz.successText
			: "Вы победили!";
		let specs = [];
		if (this.props.quiz.type == "cannon") {
			let vars = this.props.quiz.question.vars;
			let varsKeys = Object.keys(vars);
			varsKeys.forEach((el, i) => {
				let reactEl = (
					<div className="specsElement" key={i}>
						<span>{nameBindings[el][0] + ": "}
						</span>
						{vars[el] + nameBindings[el][1]}
					</div>
				);
				specs.push(reactEl);
			});
		}
		return (
			<div className="taskWindow">
				<h1>Задание:</h1>
				<p>{this.props.quiz.text}</p>
				<p className="taskWindowAnswer">{(this.props.success)
						? successText
						: null}</p>
				<p>{(this.props.quiz.failtureText && this.props.success === false)
						? this.props.quiz.failtureText
						: null}</p>

				<div className="specs">
					{specs
						? specs
						: null}
				</div>
			</div>
		);
	}
}

export default Task;
