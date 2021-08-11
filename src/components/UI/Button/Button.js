import React from 'react'
import classes from './Button.module.css'

function Button(props) {
    let icon;
    switch (props.arrow) {
        case 'up':
            icon = <i className="bi bi-caret-up-fill"></i>
            break

        case 'down':
            icon = <i className="bi bi-caret-down-fill"></i>
            break

        case 'left':
            icon = <i className="bi bi-caret-left-fill"></i>
            break

        case 'right':
            icon = <i className="bi bi-caret-right-fill"></i>
            break

        default:
            icon = '^'

    }
    return (
        <button className={classes.controlButton}>
            {icon}
        </button>
    )
}

export default Button
