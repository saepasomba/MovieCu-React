import React from 'react'
import './CustomButton.scss'

export default function CustomButton({ icon, text, block, type }) {
  return (
    <button className={`btn ${block ? 'block' : ''} ${type}`}>
      {icon ?
        <div className='icon'>
          {icon}
        </div>
        :
        <></>
      }
      <p>{text}</p>
    </button>
  )
}
