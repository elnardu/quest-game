import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/Chat';
import {CHAT_MT_INFO, CHAT_MT_ADMIN, CHAT_MT_SERVER, CHAT_MT_USER} from '../constants/Chat';

import '../styles/Chat.css';

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			from: this.props.username,
			body: ''
		};
		this.type = this.props.admin
			? CHAT_MT_ADMIN
			: CHAT_MT_USER
		this.types = ['type-user', 'type-info', 'type-admin', 'type-server'];

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleInputFocus = this.handleInputFocus.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		var mes = {
			type: CHAT_MT_USER,
			from: this.props.username,
			body: this.state.body
		}
		this.props.actions.sendMessage(mes);
		this.setState({body: ""});
	}
	handleChange(e) {
		// document.getElementsByTagName('canvas');
		this.setState({body: e.target.value});
	}
	handleInputFocus() {
		// document.getElementsByTagName('canvas')[0].blur(); //disable focus on canvas, because it is using enter key
		// document.getElementsByClassName('chat-input')[0].focus(); // TODO: this code doesn't work
	}
	render() {
		var messages = this.props.Chat.messages.map((mes, index) => {
			var cl = "chat-message " + this.types[mes.type];
			return (
				<div className={cl} key={index}>
					<span>{mes.from
							? mes.from + ": "
							: ""}</span>{mes.body}
				</div>
			);
		});

		return (
			<div className="chat">
				<div className="chat-messages">
					{messages}
				</div>
				<form className="ink-form" onSubmit={this.handleSubmit}>
					<div className="column-group gutters">
						<div className="all-60">
							<input type="text" className="chat-input" value={this.state.body} onFocus={this.handleInputFocus} onChange={this.handleChange}/>
						</div>
						<div className="all-40" style={{"paddingLeft": "5px"}}>
							<input type="submit" className="ink-button black inputSubmitButton" value="Отправить"/>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {Chat: state.Chat, username: state.App.username, admin: state.App.admin}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
// export default connect(mapStateToProps)(Chat);
// export default Chat;
