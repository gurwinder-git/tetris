import React from 'react'
import classes from './GameContainer.module.css'

function GameContainer(props) {
    return (
        <div className={classes.gameContainer}>
            {props.children}
        </div>
    )
}

export default GameContainer
