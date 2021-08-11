import * as actionTypes from '../actionTypes/actionTypes'

export const startGame = () => {
    return {
        type: actionTypes.START_GAME
    }
}

export const pauseGame = () => {
    return {
        type: actionTypes.PAUSE_GAME
    }
}

export const restartGame = () => {
    return {
        type: actionTypes.RESTART_GAME
    }
}

export const resumeGame = () => {
    return {
        type: actionTypes.RESUME_GAME
    }
}

export const moveLeft = () => {
    return {
        type: actionTypes.MOVE_LEFT
    }
}

export const moveRight = () => {
    return {
        type: actionTypes.MOVE_RIGHT
    }
}

export const rotate = () => {
    return {
        type: actionTypes.ROTATE
    }
}

export const moveDown = () => {
    return {
        type: actionTypes.MOVE_DOWN
    }
}

export const gameOver = () => {
    return {
        type: actionTypes.GAME_OVER
    }
}