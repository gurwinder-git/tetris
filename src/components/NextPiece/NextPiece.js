import React from 'react'
import css from './NextPiece.module.css'

class NextPiece extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.grid !== this.props.grid) {
            return true
        } else {
            return false
        }
    }

    render() {
        const grid = this.props.grid
        return (
            <div className={css.nextPieceGrid}>
                {
                    grid.map((line, y) => {

                        return line.map((col, x) => {

                            const classes = []
                            let textContent = 0

                            //for grid
                            if (grid[y][x] > 0) {
                                classes.push(css.color)
                                textContent = grid[y][x]
                            }

                            return (
                                <span key={`${y}_${x}`} className={classes.join(' ')}>
                                    {/* {textContent} */}
                                </span>
                            )
                        })
                    })
                }
            </div >
        )
    }
}

export default NextPiece
