import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  password: null,
};

export const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        setLoginSuccess:(state, action)=>{
          state.login = action.payload   
        },
        setLoginUnsuccess:(state, action)=>{
          state.password = action.payload
        }
    }
})

// const {} = loginSlice.actions

export default loginSlice.reducer