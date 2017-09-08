import React, {Component} from 'react';
import '../../styles/PlayerSkin.css';
import image from '../../../public/assets/player1.png'

class PlayerSkin extends Component {
	render() {
		let points = this.props.data.points;
		let rank = "";
		if(points < 100) rank = "новичок";
		else if(points < 500) rank = "Не новичок";
		else if(points < 1000) rank = "Бывалый";
		else if(points < 2000) rank = "Часть ЛММ";


		return (
			<div className="skinContainer">
				<div className="skinCard">
					<div className="skinUsername">{this.props.data.username}</div>
					<div className="skinProp skinPoints">{this.props.data.points+'♦'}</div>
					<div className="skinProp">{rank}</div>
					<img src={image} className="skinImage"/>
				</div>
			</div>
		);
	}
}

export default PlayerSkin;
