import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  password: null,
  userName:null,
  loginLoading:null
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
        },
        setLoginLoader:(state, action)=>{
          state.loginLoading = action.payload
        }
    }
})

export const {setUsername, setLoginLoader} = loginSlice.actions

export default loginSlice.reducer