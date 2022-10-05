import React from 'react'
import './CustomButton.scss'

export default function CustomButton({ icon, text, block, type }) {
  console.log('block', block, text)
  return (
    <button className={`btn ${block ? 'block' : ''} ${type}`}>
      {icon &&
        <div className='icon'>
          {icon}
        </div>
      }
      <p>{text}</p>
    </button>
  )
}
