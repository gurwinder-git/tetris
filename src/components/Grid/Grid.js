import React from 'react'
import css from './Grid.module.css'

function Grid({ grid, piece }) {
    // console.log(piece.mergeData)

    return (
        <div id={css.grid}>
            {
                grid.map((line, y) => {

                    return line.map((col, x) => {

                        const classes = []
                        if (x === 0) {
                            classes.push(css.first)
                        }

                        if (piece) {
                            if (piece.mergeData.indexOf(y + '_' + x) !== -1) {
                                classes.push(css.color)
                            }
                        }
                        if (grid[y][x] > 0) {
                            classes.push(css.color)
                        }

                        return (
                            <span key={`${y}${x}`} className={classes.join(' ')}>
                                {
                                    piece ?
                                        piece.mergeData.indexOf(y + '_' + x) !== -1 ? '1' : grid[y][x] :
                                        grid[y][x]
                                }
                            </span>
                        )
                    })
                })
            }
        </div >
    )
}

export default Grid
