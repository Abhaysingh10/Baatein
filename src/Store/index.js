import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import loginReducer from '../Components/Login/loginReducer'
import OwnerReducer from '../OwnerReducer'
import ChatpageReducers from '../Components/Chatpage/ChatpageReducers'
import modalReducer from '../Components/Modal/modalReducer'
import SocketReducer from '../Components/Socket.js/SocketReducer'
import videoCallReducer from '../Components/videoCallReducer'

export const store = configureStore({
  reducer: {
    login:loginReducer,
    ownerInfo:OwnerReducer,
    chat:ChatpageReducers,
    modal:modalReducer,
    videoCall:videoCallReducer
    
  },
})
