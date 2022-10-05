import React from 'react'
import './CustomButton.scss'

export default function CustomButton({ icon, text }) {
  return (
    <button className='btn'>
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
