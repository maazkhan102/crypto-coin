import React from 'react'
import styles from './Textinput.module.css'
const Textinput = (props) => {
  return (
    <div className={styles.textInputWrapper}>
        <input {...props}/>
        {props.error && <p className={styles.errormessage}>{props.errormessage}</p>}  
    </div>
  )
}

export default Textinput