import React from 'react'
import classes from './LeftDiv.module.css'

import Button from './Button/Button'

function LeftDiv() {
    return (
        <div className={classes.leftDiv}>
            <Button>Play</Button>
            <Button>Restart</Button>
        </div>
    )
}

export default LeftDiv
