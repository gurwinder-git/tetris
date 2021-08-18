import React from 'react'
import css from './MessagePopUp.module.css'

//component
import StartButton from '../StartButton/StartButton'

function MessagePopUp({ paused, gameOver, resumeGame, startGame }) {
    let message = ''
    let func
    let btnTextContent = ''
    if (paused) {
        message = 'Paused'
        func = resumeGame
        btnTextContent = 'Resume'
    }
    if (gameOver) {
        message = 'Game over'
        func = startGame
        btnTextContent = 'Play again'
    }
    return (
        <div className={css.Message_pop_up} >
            {message}
            <StartButton clicked={func}>{btnTextContent}</StartButton>
        </div>
    )
}
export default MessagePopUp
