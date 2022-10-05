import React from 'react'
import movielistLogo from '../../movielist-logo.svg'
import CustomButton from '../CustomButton/CustomButton'
import { AiOutlineSearch } from 'react-icons/ai'
import './NavBar.scss'

export default function Navbar() {
  return (
    <div className='navbar'>
      <div className='container container-navbar'>
        <img src={movielistLogo} alt='movielist logo' />
        <div className='searchbar'>
          <input type='text' placeholder='Search movie...'></input>
          <AiOutlineSearch className='search-icon' />
        </div>
        <div className='auth-btn-group'>
          <CustomButton text='Login' block type='btn-transparent'/>
          <CustomButton text='Register' block />
        </div>
      </div>
    </div>
  )
}
