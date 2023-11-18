import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    messages:null
}

export const chatSlice = createSlice({
    name:"chatPage",
    initialState,
    reducers:{
        setMessages:(state, action)=>{
            state.messages = action.payload 
        }
    }
})

export const { setMessages } = chatSlice.actions

export default chatSlice.reducer