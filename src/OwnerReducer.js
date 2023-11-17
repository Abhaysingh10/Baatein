import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    ownerInfo:null,
    friendList:null
}

export const ownerSlice = createSlice({
    initialState,
    name:"owner",
    reducers: {
        setOwnerInfo:(state, action)=>{
            state.ownerInfo = action.payload
        },
        setFriendList:(state, action)=>{
          state.friendList = action.payload  
        }
    }

})

export const {setFriendList, setOwnerInfo} = ownerSlice.actions
export default ownerSlice.reducer