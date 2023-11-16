import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  password: null,
  userName:null,
  loginLoading:null,
  userInfo:null
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
        },
        setUserInfo:(state, action)=>{
          state.userInfo = action.payload
        }
    }
})

export const {setUsername, setLoginLoader, setUserInfo} = loginSlice.actions

export default loginSlice.reducer