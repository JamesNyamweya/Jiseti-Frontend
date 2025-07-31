import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import recordReducer from '../features/recordSlice';
import profileReducer from '../features/profileSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    records: recordReducer,
    profile: profileReducer, 
  },
});