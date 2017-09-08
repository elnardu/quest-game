import React, {Component} from 'react';
import '../../styles/Menu.css';

class Menu extends Component {
	constructor(props) {
		super(props);

		// this.componentWillMount = this.componentWillMount.bind(this);
	}
	componentWillMount() {
		this.props.actions.getWorlds();
		this.props.actions.getTopPlayers();
	}
	handleWorldCardClick(i) {
		this.props.actions.enterWorld(this.props.data.worlds[i]._id);
		console.log("click ", i);
	}
	render() {
		var worlds = this.props.data.worlds.map((w, index) => {
			return (
				<div className="worldCard" key={index} onClick={this.handleWorldCardClick.bind(this, index)}>
					<h1>{w.name}</h1>
					<p>{w.description}</p>
				</div>
			);
		});

		var top = this.props.data.top.map((p, index) => {
			return (
				<div className="item" key={index}>
					<span className="name">{p._id}</span>:
					<span className="points">{p.points+'♦'}</span>
				</div>
			);
		});

		return (
			<div className="menuContainer">
				<div className="menuMenu">
					{/* <div className="menuCards">
                        <div className="menuCard">
                            <div className="number">10</div>
                            <div className="text">квестов доступно</div>
                        </div>
                        <div className="menuCard">
                            <div className="number">7</div>
                            <div className="text">квестов пройденно</div>
                        </div>
                        <div className="menuCard">
                            <div className="number">999</div>
                            <div className="text">очков полученно</div>
                        </div>
                        <div className="menuCard">
                            <div className="number">10</div>
                            <div className="text">друзей добавленно</div>
                        </div>
                        <div className="menuCard">
                            <div className="title">Админ</div>
                        </div>
                    </div> */}
					<div className="worlds">
						<h1>Доступные миры</h1>
						<div className="worldsCards">
							{worlds}
						</div>
					</div>
					<div className="wrapper">
						<div className="topPlayersList">
							<h1 className="title">Топ игроков:</h1>
							{top}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Menu;
