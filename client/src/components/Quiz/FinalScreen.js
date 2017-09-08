import React, { Component } from 'react';
import '../../styles/Quiz/FinalScreen.css';


class FinalScreen extends Component {
    constructor(props){
        super(props);

        this.dismiss = this.dismiss.bind(this);
    }

    dismiss() {
        this.props.actions.dismiss();
    }

    render() {
        return (
            <div className="finalScreenWindow">
                <h1>ПОБЕДА</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, repellat, minima? Qui asperiores cumque placeat, magnam tempora, et debitis ex distinctio ratione laudantium corporis repudiandae eum totam accusamus nemo quod.</p>
                <button className="ink-button green button" onClick={this.dismiss} >Отлично</button>
            </div>
        );
    }
}

export default FinalScreen;
