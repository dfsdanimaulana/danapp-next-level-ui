import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './user'
import themeReducer from './theme'

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer
})

export default rootReducer
