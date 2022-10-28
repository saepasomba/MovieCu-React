import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  token: '',
  fullName: '',
  isLoadingAuth: false,
  loginMsg: false,
  registerMsg: false,
  loginModalOpen: false,
  registerModalOpen: false
}

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (values) => {
    console.log('loginPayload', values)
    const response = await axios.post(`https://notflixtv.herokuapp.com/api/v1/users/login`, values);
    const data = response.data.data
    return data
  }
)

export const getUserAsync = createAsyncThunk(
  'auth/getUser',
  async (token) => {
    const response = await axios.get(
      `https://notflixtv.herokuapp.com/api/v1/users/me`,
      {
        headers: {
          Authorization: `bearer ${token}`
        }
      }
    )
    const data = response.data.data
    return data
  }
)

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (values) => {
    try {
      const response = await axios.post(`https://notflixtv.herokuapp.com/api/v1/users`, values);
      const data = response.data.data

      return data
      // authenticated(data.token)
    } catch(e) {
      // setRegisterMsg(true)
    }
  }
)

const logoutUtil = (state) => {
  state.token = ''
  state.fullName = ''
  state.isLoadingAuth = false
  state.loginMsg = false
  state.registerMsg = false
  localStorage.clear()
}

// const authenticatedUtil = (token) => {

// }

const AuthSlice = createSlice({
  name: 'authInfo',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setFullName: (state, action) => {
      state.fullName = action.payload
    },
    logout: (state) => {
      logoutUtil(state)
    },
    modalCancelRedux: (state) => {
      state.loginMsg = false
      state.registerMsg = false
      state.loginModalOpen = false
      state.registerModalOpen = false
    },
    toggleLoginModal: (state) => {
      state.loginModalOpen = !state.loginModalOpen
    },
    toggleRegisterModal: (state) => {
      state.registerModalOpen = !state.registerModalOpen
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoadingAuth = true
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        console.log(action)
        state.token = action.payload.token
        state.isLoadingAuth = false
        state.loginModalOpen = false
      })
      .addCase(loginAsync.rejected, (state) => {
        state.loginMsg = true
        state.isLoadingAuth = false
      })

      .addCase(getUserAsync.pending, (state) => {
        state.isLoadingAuth = true
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        console.log('user fetched', action)
        // state.token = action.payload.token
        state.fullName = `${action.payload.first_name} ${action.payload.last_name}`
        state.isLoadingAuth = false
      })
      .addCase(getUserAsync.rejected, (state) => {
        state.isLoadingAuth = false
      })

      .addCase(registerAsync.pending, (state) => {
        state.isLoadingAuth = true
      })

      .addCase(registerAsync.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.isLoadingAuth = false
        state.registerModalOpen = false
      })
      .addCase(registerAsync.rejected, (state) => {
        state.registerMsg = true
        state.isLoadingAuth = false
      })
  }
});

export const { logout, setToken, modalCancelRedux, toggleLoginModal, toggleRegisterModal, setFullName } = AuthSlice.actions

export const selectAuthInfo = (state) => {
  return state.authInfo
}

export default AuthSlice.reducer