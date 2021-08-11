import React from 'react'
import classes from './NextBlock.module.css'
import GridSquare from '../../UI/GridSquare/GridSquare'

function NextBlock() {

    const box = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]

    const nextShapeBlock = box.map((rowArray, row) => {
        return rowArray.map((square, col) => {
            return <GridSquare key={`${row}${col}`} colorNumber={square} />
        })
    })


    return (
        <div className={classes.nextBlockDiv}>
            <h4>Next</h4>
            <div className={classes.displayGrid}>
                {nextShapeBlock}
            </div>
        </div>
    )
}

export default NextBlock
