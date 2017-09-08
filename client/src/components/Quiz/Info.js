import React, { Component } from 'react';
import '../../styles/Quiz/Info.css';


class Info extends Component {
  render() {
		const success = this.props.success;
    return (
      <div className="infoWindow">
        <h1 className="levelNumber">{this.props.quiz.title}</h1>
        {/* <p className="levelDescription">
            Очков за прохождение: 100 <br/>
            Сложность: средняя
        </p> */}
        <div className="filler"></div>
				{/* <div className="infoSuccess">{success ? "Победа" : null}</div> */}
        <div className="infoTries">
            {`Попыток ${this.props.tries}/`}
            <span className="maxTries">
                {this.props.quiz.maxTries}
            </span>
						<span className="infoPoints">{this.props.quiz.points+'♦'}</span>
        </div>
      </div>
    );
  }
}

export default Info;
