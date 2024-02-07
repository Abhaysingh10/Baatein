import { createSlice } from "@reduxjs/toolkit"

const initialState={
    offer : null,
    offerSdp: null,
    callResponse:null
} 

const videoCallSlice = createSlice({
    name:"videoCall",
    initialState,
    reducers:{
        setOfferSdp:(state, action)=>{
            console.log("action",action)
            state.offer = action.payload.offer?.offer;
            state.offerSdp = action.payload.offer?.sdp
        },
        setCallResponse:(state, action)=>{
            state.callResponse = action.payload
        }
    }   
})

export const {setOfferSdp, setCallResponse} = videoCallSlice.actions
export default videoCallSlice.reducer