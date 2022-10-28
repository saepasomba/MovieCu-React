import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Form, Input } from 'antd';

import movielistLogo from '../../assets/movielist-logo.svg'
import CustomButton from '../CustomButton/CustomButton'
import { AiOutlineSearch } from 'react-icons/ai'
import './NavBar.scss'
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthInfo, logout, setToken, getUserAsync, loginAsync, registerAsync, modalCancelRedux, toggleLoginModal, toggleRegisterModal, setFullName } from '../../reducers/AuthSlice';


export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [searchBar, setSearchBar] = useState('')

  // const [loginModalOpen, setLoginModalOpen] = useState(false)
  // const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const [authType, setAuthType] = useState('')

  const token = useSelector(selectAuthInfo).token
  const fullName = useSelector(selectAuthInfo).fullName
  const loginMsg = useSelector(selectAuthInfo).loginMsg
  const registerMsg = useSelector(selectAuthInfo).registerMsg
  const isLoadingAuth = useSelector(selectAuthInfo).isLoadingAuth
  const loginModalOpen = useSelector(selectAuthInfo).loginModalOpen
  const registerModalOpen = useSelector(selectAuthInfo).registerModalOpen

  // const [token, setToken] = useState('')
  // const [fullName, setFullName] = useState('')
  // const [loginMsg, setLoginMsg] = useState(false)
  // const [registerMsg, setRegisterMsg] = useState(false)
  // const [isLoadingAuth, setIsLoadingAuth] = useState(false)


  const search = () => {
    navigate(`/search/${searchBar}`)
  }

  const handleSearchChange = (event) => {
    setSearchBar(event.target.value)
  }

  const handleEnterPressed = (event) => {
    if (event.key === 'Enter') {
      search()
    }
  }

  const loginClicked = () => {
    // setLoginModalOpen(current => !current)
    dispatch(toggleLoginModal())
  }

  const registerClicked = () => {
    // setRegisterModalOpen(current => !current)
    dispatch(toggleRegisterModal())
  }

  const modalCancel = () => {
    dispatch(modalCancelRedux())
  }

  // const logout = () => {
  //   localStorage.clear()
  //   setToken('')
  //   setAuthType('')
  //   setFullName('')
  // }

  const loginSubmit = (values) => {
    
    dispatch(loginAsync(values))
    authenticated(token)
  }

  const registerSubmit = (values) => {
    
    dispatch(registerAsync(values))
    authenticated(token)
  }

  const responseGoogle = (response) => {
    
    authenticated(response.credential, 'google-oauth')
  }
  
  const authenticated = (token, type = 'regular') => {
    localStorage.setItem('token', JSON.stringify(token))
    if (type === 'regular') {
      setAuthType('regular')
      localStorage.setItem('auth_type', 'regular')

    } else if (type === 'google-oauth') {
      setAuthType('google-oauth')
      localStorage.setItem('auth_type', 'google-oauth')
      dispatch(setToken(token))
      dispatch(setFullName('Google user'))
      modalCancel()
    }
  }

  useEffect(() => {
    if (!token) {
      const tokenLocal = JSON.parse(localStorage.getItem('token'))
      dispatch(setToken(tokenLocal))
      setAuthType(localStorage.getItem('auth_type'))
    }

    if (token) {
      
      if (authType === 'regular') {
        dispatch(getUserAsync(token))
        authenticated(token)
      } else if (authType === 'google-oauth') {
        
        dispatch(setFullName('Google user'))
        authenticated(token, 'google-oauth')
      }
    }
  }, [token, authType])
  

  return (
    <div className='navbar'>
      <div className='container container-navbar'>
        <a href='/'><img className='app-logo' src={movielistLogo} alt='movielist logo' /></a>
        <div className='searchbar'>
          <input type='text' placeholder='Search movie...' onKeyDown={handleEnterPressed} onChange={handleSearchChange}></input>
          <AiOutlineSearch className='search-icon' onClick={search}/>
        </div>
        {token ?
          <h1 className='user-greet' onClick={() => dispatch(logout())}>Welcome {fullName}</h1>
          :
          <div className='auth-btn-group'>
            <CustomButton text='Login' block type='btn-transparent' onClick={loginClicked}/>
            <CustomButton text='Register' block onClick={registerClicked}/>
          </div>
        }
        </div>

      <Modal title="Login"
      open={loginModalOpen}
      onOk={loginSubmit}
      onCancel={modalCancel}
      footer={null}
      >
        <Form
          className='auth-form'
          name="basic"
          labelCol={{ span: 5 }}
          initialValues={{ remember: true }}
          onFinish={loginSubmit}
          onFinishFailed={modalCancel}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          {loginMsg &&
            <p className='error-msg'>Login failed, please check your email and password are correct!</p>
          }
          <CustomButton text='Login' htmlType='submit' />
        </Form>
        <br/>
        <GoogleLogin
          className='google-oauth-btn'
          onSuccess={responseGoogle}
          onError={() => {
          }}
          shape='pill'
        />
        {isLoadingAuth && <p>Authenticating...</p>}
      </Modal>

      <Modal title="Register"
      open={registerModalOpen}
      onOk={registerSubmit}
      onCancel={modalCancel}
      footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          // wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={registerSubmit}
          onFinishFailed={modalCancel}
          autoComplete="off"
        >
          <Form.Item
            name="first_name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="last_name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                type: 'email',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password Confirmation" />
          </Form.Item>
          {registerMsg &&
            <p className='error-msg'>Register failed, please try again. Make sure your email is unique!</p>
          }
          <CustomButton text='Register' htmlType='submit' />
        </Form>
        <br/>
        <GoogleLogin
          className='google-oauth-btn'
          onSuccess={responseGoogle}
          onError={() => {
          }}
          shape='pill'
        />
        {isLoadingAuth && <p>Authenticating...</p>}
      </Modal>
    </div>
  )
}
