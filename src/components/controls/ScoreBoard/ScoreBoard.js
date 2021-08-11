import React from 'react'
import classes from './ScoreBoard.module.css'

function ScoreBoard() {
    return (
        <div>
            <div className={classes.highScoreDiv}>
                <h4>High Score</h4>
                <div>

                </div>
            </div>

            <div className={classes.currentScoreDiv}>
                <h4>Score</h4>
                <div>

                </div>
            </div>
        </div>
    )
}

export default ScoreBoard
