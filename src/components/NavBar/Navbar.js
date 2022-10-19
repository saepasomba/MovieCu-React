import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Form, Input } from 'antd';

import movielistLogo from '../../assets/movielist-logo.svg'
import CustomButton from '../CustomButton/CustomButton'
import { AiOutlineSearch } from 'react-icons/ai'
import './NavBar.scss'
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';


export default function Navbar() {
  /**
   * TODO:
   * - Loading after clicking login/register --
   * - Close modal after success -- DONE
   * - Handle wrong input on form -- DONE
   */


  const [searchBar, setSearchBar] = useState('')

  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const [authType, setAuthType] = useState('')
  const [token, setToken] = useState('')
  const [fullName, setFullName] = useState('')
  const [loginMsg, setLoginMsg] = useState(false)
  const [registerMsg, setRegisterMsg] = useState(false)
  const [isLoadingAuth, setIsLoadingAuth] = useState(false)

  const navigate = useNavigate()

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
    setLoginModalOpen(current => !current)
  }

  const registerClicked = () => {
    setRegisterModalOpen(current => !current)
  }

  const modalCancel = () => {
    setLoginModalOpen(false)
    setRegisterModalOpen(false)
    setLoginMsg(false)
    setRegisterMsg(false)
  }

  const logout = () => {
    localStorage.clear()
    setToken('')
    setAuthType('')
    setFullName('')
  }

  const loginSubmit = async(values) => {
    setIsLoadingAuth(true)
    try {
      const response = await axios.post(`https://notflixtv.herokuapp.com/api/v1/users/login`, values);
      const data = response.data.data
      authenticated(data.token)
    } catch(e) {
      setLoginMsg(true)
    }
  }

  const registerSubmit = async(values) => {
    setIsLoadingAuth(true)
    try {
      const response = await axios.post(`https://notflixtv.herokuapp.com/api/v1/users`, values);
      const data = response.data.data

      authenticated(data.token)
    } catch(e) {
      setRegisterMsg(true)
    }
  }

  const responseGoogle = (response) => {
    authenticated(response.credential, 'google-oauth')
  }
  
  const authenticated = (token, type = 'regular') => {
    localStorage.setItem('token', JSON.stringify(token))
    setToken(token)
    if (type === 'regular') {
      localStorage.setItem('auth_type', 'regular')
      setAuthType('regular')
    } else if (type === 'google-oauth') {
      localStorage.setItem('auth_type', 'google-oauth')
      setAuthType('google-oauth')
    }
    setIsLoadingAuth(false)
    modalCancel()
  }

  useEffect(() => {
    if (!token) {
      const tokenLocal = JSON.parse(localStorage.getItem('token'))
      setToken(tokenLocal)
      setAuthType(localStorage.getItem('auth_type'))
    }

    if (token) {
      if (authType === 'regular') {
        const fetchUser = async() => {
          try {
            const response = await axios.get(
              `https://notflixtv.herokuapp.com/api/v1/users/me`,
              {
                headers: {
                  Authorization: `bearer ${token}`
                }
              }
            )
            setFullName(`${response.data.data.first_name} ${response.data.data.last_name}`)
          } catch (e) {
            setToken('')
            localStorage.clear()
          }
        }
        fetchUser()
      } else if (authType === 'google-oauth') {
        setFullName('Google user')
      }
    }
  }, [authType, token])
  

  return (
    <div className='navbar'>
      <div className='container container-navbar'>
        <a href='/'><img className='app-logo' src={movielistLogo} alt='movielist logo' /></a>
        <div className='searchbar'>
          <input type='text' placeholder='Search movie...' onKeyDown={handleEnterPressed} onChange={handleSearchChange}></input>
          <AiOutlineSearch className='search-icon' onClick={search}/>
        </div>
        {token ?
          <h1 className='user-greet' onClick={logout}>Welcome {fullName}</h1>
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
