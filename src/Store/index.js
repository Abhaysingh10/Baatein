import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../Pages/Login/loginReducer'

export const store = configureStore({
  reducer: {
    login:loginReducer
  },
})
