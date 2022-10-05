import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUser = createAsyncThunk('user/fetchUser', async (url) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (err) {
    return err.message
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
    status: 'idle',
    error: null
  },
  reducers: {
    login: (state, action) => {
      state.value = {
        ...state.value,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      }
    },
    logout: (state) => {
      state.value = null
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value = {
          ...action.payload,
          accessToken: state.value.accessToken
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const getUserValue = (state) => state.user.value
export const getUserStatus = (state) => state.user.status
export const getUserError = (state) => state.user.error

export const { login, logout } = userSlice.actions

export default userSlice.reducer
