import React from 'react'
import classes from './MassagePopUp.module.css'

import BackDrop from './BackDrop/BackDrop'

function MassagePopUp(props) {
    return (
        <>
            <BackDrop />
            <div className={classes.massagePopUp}>
                <h3>{props.massage}</h3>
            </div>
        </>
    )
}

export default MassagePopUp
