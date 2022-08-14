import React from 'react'
import './styles.css'

function Button(props) {
  return (
    <button className='btn'>
        {props.title}
    </button>
  )
}

export default Button