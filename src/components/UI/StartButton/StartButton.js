import React from 'react'
import css from './StartButton.module.css'

function StartButton(props) {
    return <button className={css.start_button} onClick={props.clicked}>{props.children}</button>
}

export default StartButton
