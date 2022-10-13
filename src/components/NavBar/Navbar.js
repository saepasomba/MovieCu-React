import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  } from 'antd';
import { Modal, Form, Input } from 'antd';

import movielistLogo from '../../assets/movielist-logo.svg'
import CustomButton from '../CustomButton/CustomButton'
import { AiOutlineSearch } from 'react-icons/ai'
import './NavBar.scss'
import axios from 'axios';

export default function Navbar() {
  const [searchBar, setSearchBar] = useState('')
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const [form] = Form.useForm()


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
  }

  const loginSubmit = async(values) => {
    try {
      console.log(values)
      const response = await axios.post(`http://notflixtv.herokuapp.com/api/v1/users/login`, values);
      console.log(response)
    } catch(e) {
      console.log(e)
    }
  }

  const registerSubmit = async(values) => {
    try {
      console.log(values)
      const response = await axios.post(`http://notflixtv.herokuapp.com/api/v1/users`, values);
      console.log(response)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div className='navbar'>
      <div className='container container-navbar'>
        <a href='/'><img className='app-logo' src={movielistLogo} alt='movielist logo' /></a>
        <div className='searchbar'>
          <input type='text' placeholder='Search movie...' onKeyDown={handleEnterPressed} onChange={handleSearchChange}></input>
          <AiOutlineSearch className='search-icon' onClick={search}/>
        </div>
        <div className='auth-btn-group'>
          <CustomButton text='Login' block type='btn-transparent' onClick={loginClicked}/>
          <CustomButton text='Register' block onClick={registerClicked}/>
        </div>
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
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <CustomButton text='Login' htmlType='submit' />,
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

          <CustomButton text='Register' htmlType='submit' />,
        </Form>
      </Modal>
    </div>
  )
}
