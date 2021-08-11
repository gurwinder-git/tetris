import React from 'react'
import GridSquare from '../GridSquare/GridSquare'
import classes from './GridBoard.module.css'


function GridBroad() {

    const gridBoard = []
    for (let row = 0; row < 18; row++) {
        gridBoard.push([])
        for (let col = 0; col < 10; col++) {
            gridBoard[row].push(<GridSquare key={`${col}${row}`} colorNumber='6' />)
        }
    }

    return (
        <div className={classes.gridBoard}>
            {gridBoard}
        </div>
    )
}

export default GridBroad

