import React from 'react'
import css from './Grid.module.css'

function Grid({ grid, piece }) {
    // console.log(piece.mergeData)

    return (
        <div id={css.grid}>
            {
                grid.map((line, y) => {
                    return line.map((col, x) => {
                        return (<span key={`${y}${x}`} className={x === 0 ? css.first : ''}>
                            {
                                piece ? piece.mergeData.indexOf(y + '_' + x) !== -1 ? '1' : grid[y][x] :
                                    grid[y][x]
                            }
                        </span>)
                    })
                })
            }
        </div >
    )
}

export default Grid
