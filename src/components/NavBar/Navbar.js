import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Form, Input } from 'antd';

import movielistLogo from '../../assets/movielist-logo.svg'
import CustomButton from '../CustomButton/CustomButton'
import { AiOutlineSearch } from 'react-icons/ai'
import './NavBar.scss'
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthInfo, logout, setToken, getUserAsync, loginAsync, registerAsync, modalCancelRedux, toggleLoginModal, toggleRegisterModal, setFullName, setLoadingAuth } from '../../reducers/AuthSlice';
import { auth, signInWithGoogle, db, logInWithEmailAndPassword, registerWithEmailAndPassword } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";


export default function Navbar() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [searchBar, setSearchBar] = useState('')
  const [authType, setAuthType] = useState('')
  const [user, loading, error] = useAuthState(auth);

  const token = useSelector(selectAuthInfo).token
  const fullName = useSelector(selectAuthInfo).fullName
  const loginMsg = useSelector(selectAuthInfo).loginMsg
  const registerMsg = useSelector(selectAuthInfo).registerMsg
  const isLoadingAuth = useSelector(selectAuthInfo).isLoadingAuth
  const loginModalOpen = useSelector(selectAuthInfo).loginModalOpen
  const registerModalOpen = useSelector(selectAuthInfo).registerModalOpen

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
    dispatch(toggleLoginModal())
  }

  const registerClicked = () => {
    dispatch(toggleRegisterModal())
  }

  const modalCancel = () => {
    dispatch(modalCancelRedux())
  }

  const loginSubmit = async (values) => {
    setLoadingAuth(true)
    const userAuth = await logInWithEmailAndPassword(values.email, values.password)
    await authenticated(userAuth)
    setLoadingAuth(false)
  }

  const registerSubmit = async (values) => {
    setLoadingAuth(true)
    try {
      const userAuth = await registerWithEmailAndPassword(values.name, values.email, values.password)
      await authenticated(userAuth)
    } catch (e) {
      console.log(e)
    } finally {
      setLoadingAuth(false)
    }
  }

  const responseGoogle = async () => {
    const userAuth = await signInWithGoogle()
    await authenticated(userAuth)
  }
  
  const authenticated = async (userAuth) => {
    try {
      let userData = await fetchUser(userAuth)
      dispatch(setToken(userData.uid))
      dispatch(setFullName(userData.name))
      dispatch(modalCancelRedux())
    } catch (e) {
      console.error(e)
    }
  }

  const fetchUser = async (userAuth) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", userAuth?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      return data;

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user) {
      try {
        authenticated(user)
      } catch (e) {
      }
    }
  }, [user])
  

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
        <CustomButton text='Login with google' htmlType='submit' onClick={responseGoogle} />
        {/* <GoogleLogin
          className='google-oauth-btn'
          onSuccess={responseGoogle}
          onError={() => {
          }}
          shape='pill'
        /> */}
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
            name="name"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input placeholder="First Name" />
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

          {registerMsg &&
            <p className='error-msg'>Register failed, please try again. Make sure your email is unique!</p>
          }
          <CustomButton text='Register' htmlType='submit' />
        </Form>
        <br/>
        <CustomButton text='Login with google' htmlType='submit' onClick={responseGoogle} />
        {isLoadingAuth && <p>Authenticating...</p>}
      </Modal>
    </div>
  )
}
