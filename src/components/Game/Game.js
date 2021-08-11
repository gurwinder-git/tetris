import React from 'react'
import classes from './Game.module.css'
import GridBroad from '../UI/GridBroad/GridBroad'

function Game(props) {
    return (
        <div className={classes.game}>
            <GridBroad />
        </div>
    )
}

export default Game
