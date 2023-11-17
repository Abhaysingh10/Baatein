import axios from "axios"
import { setFriendList } from "../../OwnerReducer"

export const getFriendsList = (id, dispatch) => {
    axios.post('http://localhost:3000/get-friends-list', {
      owner_id: id
    }
    ).then((data) => {
      console.log(data?.data)
      dispatch(setFriendList(data?.data))
    }).catch((ex) => {
      console.log("Error in getFriendsList", ex)
    })
  }