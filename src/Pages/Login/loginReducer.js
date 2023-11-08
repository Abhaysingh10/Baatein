import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  password: null,
  userName:null
};

export const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        setUsername:(state, action)=>{
          state.userName = action.payload
      },
        setLoginSuccess:(state, action)=>{
          state.login = action.payload   
        },
        setLoginUnsuccess:(state, action)=>{
          state.password = action.payload
        }
    }
})

export const {setUsername} = loginSlice.actions

export default loginSlice.reducer