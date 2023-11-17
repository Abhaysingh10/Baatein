import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../Components/Login/loginReducer'
import OwnerReducer from '../OwnerReducer'

export const store = configureStore({
  reducer: {
    login:loginReducer,
    ownerInfo:OwnerReducer
  },
})
