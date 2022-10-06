import { createSlice } from '@reduxjs/toolkit'
import { fetchUser, registerUser, userLogin } from './userActions'

// initialize accessToken from local storage
const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null

const initialState = {
  user: null,
  status: 'idle', // idle | loading | succeeded | failed
  accessToken,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      localStorage.removeItem('accessToken') // deletes token from storage
      state.user = null
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
        state.error = null
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(registerUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.error = null
        state.user = action.payload.user
        state.accessToken = action.payload.tokens.access.token
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(userLogin.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.error = null
        state.user = action.payload.user
        state.accessToken = action.payload.tokens.access.token
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { userLogout } = userSlice.actions

export default userSlice.reducer
