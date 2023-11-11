import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../Components/Login/loginReducer'

export const store = configureStore({
  reducer: {
    login:loginReducer
  },
})
