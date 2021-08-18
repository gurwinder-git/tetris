import React from 'react'
import css from './Grid.module.css'

function Grid({ grid, piece }) {
    // console.log(piece.mergeData)
    let projectioncoordinates = []
    if (piece) {
        projectioncoordinates = getProjectionCoordinates(grid, piece)
        // console.log(projectioncoordinates)
    }

    return (
        <div id={css.grid}>
            {
                grid.map((line, y) => {

                    return line.map((col, x) => {

                        const classes = []
                        let textContent = 0

                        if (x === 0) {
                            classes.push(css.first)
                        }

                        //for piece
                        if (piece) {
                            // console.log(piece)
                            if (piece.mergeData.indexOf(y + '_' + x) !== -1) {
                                classes.push(css.color)
                                textContent = piece.color
                            }
                        }

                        //for grid
                        if (grid[y][x] > 0) {
                            classes.push(css.color)
                            textContent = grid[y][x]
                        }

                        //for projection
                        if (projectioncoordinates.length) {
                            // console.log(projectioncoordinates)
                            if (projectioncoordinates.indexOf(y + '_' + x) !== -1) {
                                classes.push(css.projection)
                            }
                        }

                        return (
                            <span key={`${y}_${x}`} className={classes.join(' ')}>
                                {
                                    textContent
                                    // piece ?
                                    //     piece.mergeData.indexOf(y + '_' + x) !== -1 ? '1' : grid[y][x] :
                                    //     grid[y][x]
                                }
                            </span>
                        )
                    })
                })
            }
        </div >
    )
}

function getProjectionCoordinates(grid, piece) {
    let coordinates = []
    let previousCoordinates = []

    for (let virtualY = piece.posY; virtualY < grid.length; virtualY++) {
        previousCoordinates = coordinates
        coordinates = []
        for (let y = 0; y < piece.grid.length; y++) { //row
            for (let x = 0; x < piece.grid[0].length; x++) { //col

                // console.log(piece.grid[0].length) //  3 3 3 3 3 3

                if (piece.grid[y][x] > 0) {

                    if (virtualY <= 0) return false

                    if (grid[y + virtualY] === undefined) {
                        return previousCoordinates
                    }

                    if (grid[y + virtualY][x + piece.posX] > 0) {
                        return previousCoordinates
                        // return false
                    }

                    coordinates.push((y + virtualY) + '_' + (x + piece.posX))
                }
            }
        }
    }
    return coordinates

}

export default Grid
