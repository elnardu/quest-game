import React, {Component} from 'react';
import {Router, Route, IndexRedirect} from 'react-router';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import '../styles/App.css';
import '../styles/Loaders.css';

class App extends Component {
	render() {
		return (
			<div>
				<div className={this.props.App.error
					? "errorWindow"
					: "none"}>
					<h1>
						{this.props.App.error}
					</h1>
				</div>
				<div className="container">
					{this.props.children}
				</div>
				<div className={this.props.App.fetching
					? "loader"
					: "none"}>
					<div className="ball-clip-rotate">
						<div></div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {App: state.App}
}
//
// function mapDispatchToProps(dispatch) {
//   return {
//     AppActions: bindActionCreators(App, dispatch)
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps)(App);
// export default App;
