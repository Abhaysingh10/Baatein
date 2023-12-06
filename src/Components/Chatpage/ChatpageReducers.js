import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    messages:[],
    totalCount: null
}

export const chatSlice = createSlice({
    name:"chatPage",
    initialState,
    reducers:{
        setMessages:(state, action)=>{
            state.messages = action.payload 
        }, 
        addMessages:(state, action)=>{
            // console.log("action.payload", action.payload)
            state.messages = [...state.messages, action.payload]
        },
        setMsgTotalCount:(state, action)=>{
            // console.log(action.payload)
            state.totalCount = action.payload
        }

    }
})

export const { setMessages, addMessages, setMsgTotalCount } = chatSlice.actions

export default chatSlice.reducer