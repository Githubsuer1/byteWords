// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer.js'
// import blogReducer from './blogReducer.js'

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    // blog: blogReducer,
  },
});
