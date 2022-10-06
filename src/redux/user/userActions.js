import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../api/axios'

// get user data
export const fetchUser = createAsyncThunk('user/fetch', async (query = '', { getState, rejectWithValue }) => {
  try {
    const { user } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    }
    const { data } = await axios.get('/user' + query, config)
    return data
  } catch (error) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
    }
  }
})

// register new user
export const registerUser = createAsyncThunk('user/register', async (formBody, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/auth/register', formBody)
    localStorage.setItem('accessToken', data.tokens.access.token)
    return data
  } catch (error) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
    }
  }
})

// login User
export const userLogin = createAsyncThunk('user/login', async (formBody, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/auth/login', formBody)
    // store user's token in local storage
    localStorage.setItem('accessToken', data.tokens.access.token)
    return data
  } catch (error) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
    }
  }
})
