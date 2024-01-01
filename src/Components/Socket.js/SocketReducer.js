// socketSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  socketInstance: null,
};

// Create the slice
const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocketInstance: (state, action) => {
      state.socketInstance = action.payload;
    },
  },
});

// Export the actions and reducer
export const { setSocketInstance } = socketSlice.actions;
export default socketSlice.reducer;
