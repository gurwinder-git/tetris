import React from 'react'
import StartButton from '../UI/StartButton/StartButton'

//css
import css from './StartGame.module.css'

function StartGame(props) {
    return (
        <div className={css.start_Game}>
            <h1>Tetris</h1>
            <StartButton clicked={props.clicked}>Start</StartButton>
        </div>
    )
}

export default StartGame
