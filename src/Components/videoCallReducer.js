import { createSlice } from "@reduxjs/toolkit"

const initialState={
    offer : null,
    offerSdp: null,
    senderSocketId: null,
    callResponse:null
} 

const videoCallSlice = createSlice({
    name:"videoCall",
    initialState,
    reducers:{
        setOfferSdp:(state, action)=>{
            state.offerSdp = action.payload.offer;
            state.senderSocketId = action.payload.senderSocketId
        },
        setCallResponse:(state, action)=>{
            state.callResponse = action.payload
        }
    }   
})

export const {setOfferSdp, setCallResponse} = videoCallSlice.actions
export default videoCallSlice.reducer