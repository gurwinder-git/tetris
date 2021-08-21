import React from 'react'
import css from './ControlButton.module.css'

function ControlButton(props) {
    let icon = '^'
    switch (props.type) {
        case 'up':
            icon = <i className="bi bi-caret-up-fill"></i>
            break

        case 'left':
            icon = <i className="bi bi-caret-left-fill"></i>
            break

        case 'right':
            icon = <i className="bi bi-caret-right-fill"></i>
            break

        case 'down':
            icon = <i className="bi bi-caret-down-fill"></i>
            break

        default:
            icon = '^'
            break
    }
    return <button className={css.c_button} onClick={() => {
        props.clicked()
    }}
        disabled={props.disabled}>{icon}</button>
}

export default ControlButton
