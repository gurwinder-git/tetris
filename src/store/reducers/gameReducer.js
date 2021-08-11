import * as actionType from '../actionTypes/actionTypes'

const initialState = {}

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.START_GAME:
            return state

        case actionType.RESUME_GAME:
            return state

        case actionType.RESTART_GAME:
            return state

        case actionType.MOVE_DOWN:
            return state

        case actionType.MOVE_LEFT:
            return state

        case actionType.MOVE_RIGHT:
            return state

        case actionType.ROTATE:
            return state

        case actionType.GAME_OVER:
            return state

        case actionType.PAUSE_GAME:
            return state

        default:
            return state
    }
}

export default gameReducer