import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PlayerSkin from '../components/Dashboard/PlayerSkin.js';
import Menu from '../components/Dashboard/Menu.js';

import * as actions from '../actions/Dashboard';

class Dashboard extends Component {
	componentWillMount() {
		this.props.actions.getMyData();
	}
	render() {
		const actions = this.props.actions;

		return (
			<div className="ink-grid app">
				<div className="column-group">
					<div className="all-25">
						<PlayerSkin data={this.props.Dashboard.userdata}/>
					</div>
					<div className="all-75">
						<Menu actions={actions} data={this.props.Dashboard}/>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {App: state.App, Dashboard: state.Dashboard}
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
// export default Dashboard;
