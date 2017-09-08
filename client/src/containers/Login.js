import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import '../styles/Login.css';
import * as actions from '../actions/App';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: ""
		}

		// if(localStorage.logged) {
		//     this.props.actions.goToDashboard();
		// }

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLoginChange = this.handleLoginChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}
	handleLoginChange(e) {
		this.setState({username: e.target.value});
	}
	handlePasswordChange(e) {
		this.setState({password: e.target.value});
	}
	handleSubmit(e) {
		e.preventDefault();
		// console.log(this.state);
		this.props.actions.login(this.state);
	}
	render() {

		return (
			<form className="ink-form loginWindow" onSubmit={this.handleSubmit}>
				<div className="control-group column-group gutters">
					<label className="all-40 align-right">Логин</label>
					<div className="control all-60">
						<input type="text" id="username" value={this.state.username} onChange={this.handleLoginChange}/>
					</div>
				</div>
				<div className="control-group column-group gutters">
					<label className="all-40 align-right">Пароль</label>
					<div className="control all-60">
						<input type="password" id="password" value={this.state.password} onChange={this.handlePasswordChange}/>
					</div>
				</div>
				<button type="submit" className="ink-button black">Войти</button>
				<a href="/registration" className="ink-button white">Зарегистрироваться</a>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {App: state.App}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login;
