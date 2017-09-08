import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../../styles/Quiz/Editor.css';
import {nameBindings} from '../../constants/Quiz';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Editor extends Component {
	constructor(props) {
		super(props);
		this.controlls = this.props.quiz.question.controlls;
		this.state = {}
		this.controlls.forEach((el) => {
			this.state[el] = 1;
		});
		this.state = {
			...this.state,
			...this.props.quiz.question.vars
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		let change = {};
		change[event.target.name] = !isNaN(+event.target.value)
			? +event.target.value
			: 1;
		this.setState(change);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.actions.newTry(this.state);
	}

	render() {
		let inp = [];
		this.controlls.forEach((el, i) => {
			let reactEl = (
				<div className="column-group gutters" key={i}>
					<label className="all-60 align-right">{nameBindings[el][0]+":"}</label>
					<div className="control all-40">
						<input type="text" name={el} onChange={this.handleChange} value={this.state[el]}/>
					</div>
				</div>
			);
			inp.push(reactEl);
		});
		return (
			<div className="editorWindow">
				<form className="ink-form" onSubmit={this.handleSubmit}>
					<div className="column-group gutters">
						<div className="control-group all-100">{inp}</div>
					</div>
					<div className="buttonGroup">
						<input type="submit" className="ink-button black button" value="Начать"/> {/* <p className={this.props.data.targetIsReached === false
							? "alert"
							: "hidden"}>ПРОМАХ</p>
						<p className={this.props.data.targetIsReached === true
							? "success"
							: "hidden"}>ПОПАЛ</p> */}
					</div>
				</form>
			</div>
		);
	}
}

export default Editor;
