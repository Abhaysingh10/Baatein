import axios from "axios"
import { setFriendList } from "../../OwnerReducer"
import { setMessages } from "./ChatpageReducers"
import { setLoginLoader } from "../Login/loginReducer"

export const getFriendsList = (id, dispatch) => {
    axios.post('http://localhost:3000/get-friends-list', {
      owner_id: id
    }
    ).then((data) => {
      dispatch(setFriendList(data?.data))
    }).catch((ex) => {
      console.log("Error in getFriendsList", ex)
    })
  }

export const fetchMessages = (senderId, receiverId, dispatch) => {
    axios.post('http://localhost:3000/fetch-messages', {
      senderId:senderId,
      receiverId:receiverId
    }).then((respone)=>{
      dispatch(setMessages(respone?.data))
      dispatch(setLoginLoader(false))
    }).catch((ex)=>{
      console.log(ex,"Error in fetchMessages")
      dispatch(setLoginLoader(false))
    })

  }