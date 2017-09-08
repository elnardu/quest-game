import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/World/Game.css';

import PhaserGame from '../../components/World/Phaser/index';

class Game extends Component {
    constructor(props) {
        super(props);

        // this.updateDimensions = this.updateDimensions.bind(this);
        // this.objNotReachedTarget = this.objNotReachedTarget.bind(this);
        // this.objReachedTarget = this.objReachedTarget.bind(this);
        // this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="gameWindow-world" id="gameWindow-world" ref="gameWindow_world" >
                {/* <p>Игра будет тута</p> */}
            </div>
        );
    }
    componentDidMount() {
        var width = ReactDOM.findDOMNode(this.refs.gameWindow_world).offsetWidth;
        var height = ReactDOM.findDOMNode(this.refs.gameWindow_world).offsetHeight;
        // this.props.actions.setGameWindowSize(width, height);
        // this.game = new PhaserGame(1000, 563);
        this.game = new PhaserGame(width, height);
				this.game.WORLD_ID = this.props.worldId || "586f440cb4a2e947d0d3a7f6";
				this.game.X = this.props.worldCoords.x ? this.props.worldCoords.x : null;
				this.game.Y = this.props.worldCoords.y ? this.props.worldCoords.y : null;

        // this.game.launchFail = this.objNotReachedTarget;
        // this.game.launchSuccess = this.objReachedTarget;
        // console.log(this.game.state.states.game.Mob1);

        // this.game.TARGET_POSITION_X = this.props.data.editable.targetPositionX;
        // console.warn(this.props.data.targetPositionX);

        // console.log(this.game);

        // window.addEventListener("resize", this.updateDimensions);
    }
    shouldComponentUpdate(nextProps, nextState) {
        // this.game.ANGLE = -(nextProps.data.editable.angle * Math.PI / 180);
        // this.game.BULLET_SPEED = nextProps.data.editable.velocity * 32;
        // this.game.TARGET_POSITION_X = nextProps.data.editable.targetPositionX;
        // this.game.GRAVITY = nextProps.data.editable.gravity * 32;
        // if(this.game.physics != undefined){
        //     this.game.physics.arcade.gravity.y = nextProps.data.editable.gravity * 32;
        // }
        // if(nextProps.data.isSimulating) {
        //     setTimeout(()=>{
        //         this.game.shootBullet();
        //     }, 500);
        // }

        return false;
    }
		componentWillUnmount() {
			this.game.destroy();
		}
}

export default Game;
