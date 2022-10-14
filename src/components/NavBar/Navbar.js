import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Form, Input } from 'antd';

import movielistLogo from '../../assets/movielist-logo.svg'
import CustomButton from '../CustomButton/CustomButton'
import { AiOutlineSearch } from 'react-icons/ai'
import './NavBar.scss'
import axios from 'axios';

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
  const [token, setToken] = useState('')
  const [fullName, setFullName] = useState('')
  const [loginMsg, setLoginMsg] = useState(false)
  const [registerMsg, setRegisterMsg] = useState(false)

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
    localStorage.removeItem('token')
    setToken('')
  }

  const loginSubmit = async(values) => {
    try {
      const response = await axios.post(`https://notflixtv.herokuapp.com/api/v1/users/login`, values);
      const data = response.data.data
      localStorage.setItem('token', JSON.stringify(data.token))
      setToken(data.token)
      modalCancel()
    } catch(e) {
      console.log('error brou')
      console.log(e)
      setLoginMsg(true)
    }
  }

  const registerSubmit = async(values) => {
    try {
      console.log(values)
      const response = await axios.post(`https://notflixtv.herokuapp.com/api/v1/users`, values);
      const data = response.data.data

      localStorage.setItem('token', JSON.stringify(data.token))
      setToken(data.token)
      modalCancel()
    } catch(e) {
      console.log(e)
      setRegisterMsg(true)
    }
  }

  useEffect(() => {
    if (!token) {
      const tokenLocal = JSON.parse(localStorage.getItem('token'))
      setToken(tokenLocal)
    }

    if (token) {
      const fetchUser = async() => {
        const response = await axios.get(
          `https://notflixtv.herokuapp.com/api/v1/users/me`,
          {
            headers: {
              Authorization: `bearer ${token}`
            }
          }
        )
        // const response = await axios.get(`https://notflixtv.herokuapp.com/api/v1/users/activate?token=${token}`)
        console.log(response)
        setFullName(`${response.data.data.first_name} ${response.data.data.last_name}`)
      }
      fetchUser()
    }
  }, [token])
  

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
      </Modal>
    </div>
  )
}
