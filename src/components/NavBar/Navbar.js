import React from 'react'
import { useNavigate } from 'react-router-dom'
import movielistLogo from '../../movielist-logo.svg'
import CustomButton from '../CustomButton/CustomButton'
import { AiOutlineSearch } from 'react-icons/ai'
import './NavBar.scss'

export default function Navbar() {

  return (
    <div className='navbar'>
      <div className='container container-navbar'>
        <a href='/'><img className='app-logo' src={movielistLogo} alt='movielist logo' /></a>
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
