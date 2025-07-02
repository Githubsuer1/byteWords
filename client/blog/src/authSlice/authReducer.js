// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialLoadingStatus = !!localStorage.getItem('token');


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggin:initialLoadingStatus,
  },
  reducers: {
    login:(state)=>{
      state.isLoggin = true;
    },
    logout:(state)=>{
      state.isLoggin = false;
    }
  },
  
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
