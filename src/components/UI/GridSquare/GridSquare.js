import React from 'react'
import classes from './GridSquare.module.css'

function GridSquare(props) {
    const sqareColor = classes['color' + props.colorNumber]
    return <div className={[classes.gridSquare, sqareColor].join(' ')}> </div>
}

export default GridSquare
