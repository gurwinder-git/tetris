import React from 'react'
import classes from './NextBlock.module.css'
import GridSquare from '../../UI/GridSquare/GridSquare'
import { connect } from 'react-redux'
import { Component } from 'react'
import { shapes } from '../../../utils/utils'

class NextBlock extends Component {
    render() {
        const indexOfShape = this.props.nextShape
        const box = shapes[indexOfShape][0]

        const nextShapeBlock = box.map((rowArray, row) => {
            return rowArray.map((square, col) => {
                return <GridSquare key={`${row}${col}`} colorNumber={square} />
            })
        })

        console.log(this.props)

        return (
            <div className={classes.nextBlockDiv}>
                <h4>Next</h4>
                <div className={classes.displayGrid}>
                    {nextShapeBlock}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (props) => {
    return {
        nextShape: props.game.nextShape
    }
}

export default connect(mapStateToProps)(NextBlock)
