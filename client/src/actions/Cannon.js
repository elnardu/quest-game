import {
    SET_VARIABLES,
    START_SIMULATION,
    PAUSE_SIMULATION,
    END_SIMULATION,
    OBJECT_REACHED_TARGET,
    OBJECT_NOT_REACHED_TARGET,
    SET_GAMEWINDOW_SIZE,
    CALCULATE_TARGET_POSITION,
    FINISH_GAME
} from '../constants/Quiz';

import { getRandomInt } from '../Utils';

export function setVariables(payload) {
    return {
        type: SET_VARIABLES,
        payload: payload
    };
}

export function setGameWindowSize(width, height) {
    return (dispatch) => {
        dispatch({
            type: SET_GAMEWINDOW_SIZE,
            payload: {
                width: width,
                height: height
            }
        });

        // let position = width - getRandomInt(2, width/32)*32;
        let position = getRandomInt(10, 20)*32 + 50;
        setTimeout(() => {
            dispatch({
                type: CALCULATE_TARGET_POSITION,
                payload: position
            });
        }, 0);
    };
}

export function startSimulation() {
    return {
        type: START_SIMULATION
    };
}

export function objNotReachedTarget() {
    return (dispatch) => {
        dispatch({
            type: OBJECT_NOT_REACHED_TARGET
        });

        setTimeout(() => {
            dispatch({
                type: END_SIMULATION
            })
        }, 2000);
    };
}

export function objReachedTarget() {
    return (dispatch) => {
        dispatch({
            type: OBJECT_REACHED_TARGET
        });

        setTimeout(() => {
            dispatch({
                type: END_SIMULATION
            })
        }, 2000);
    }
}

export function dismiss() {
    return {
        type: FINISH_GAME
    };
}
