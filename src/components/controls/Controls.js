import React from 'react'
import classes from './Controls.module.css'

import Button from '../UI/Button/Button'
import NextBlock from './NextBlock/NextBlock'
import ScoreBoard from './ScoreBoard/ScoreBoard'

function Controls() {
    return (
        <div className={classes.controls}>
            <h3 className={classes.heading}>tetris</h3>
            <div className={classes.marginAuto}>
                <NextBlock />
                <ScoreBoard />
            </div>

            <div className={classes.buttonsDiv}>
                <Button arrow='up' />
                <div>
                    <Button arrow='left' />
                    <Button arrow='right' />
                </div>
                <Button arrow='down' />
            </div>
        </div>
    )
}

export default Controls
