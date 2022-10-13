import React from 'react'
import './CustomButton.scss'

export default function CustomButton({ icon, text, block, type, onClick, htmlType }) {
  return (
    <button className={`btn ${block ? 'block' : ''} ${type}`} onClick={onClick} type={htmlType}>
      {icon &&
        <div className='icon'>
          {icon}
        </div>
      }
      <p>{text}</p>
    </button>
  )
}
