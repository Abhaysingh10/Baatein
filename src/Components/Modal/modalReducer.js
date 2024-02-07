import { createSlice } from "@reduxjs/toolkit";

const initialState = {
videoCallModal: false,
callNotification: false
}
export const modalSlice = createSlice({
    initialState,
    name:"modal",
    reducers:{
        modalAction:(state, action)=>{
            state[action.payload.name] = action.payload.val
        }
    }
})

export const { modalAction } = modalSlice.actions
export default modalSlice.reducer