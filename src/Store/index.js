import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../Components/Login/loginReducer'
import OwnerReducer from '../OwnerReducer'
import ChatpageReducers from '../Components/Chatpage/ChatpageReducers'
import modalReducer from '../Components/Modal/modalReducer'

export const store = configureStore({
  reducer: {
    login:loginReducer,
    ownerInfo:OwnerReducer,
    chat:ChatpageReducers,
    modal:modalReducer
  },
})
