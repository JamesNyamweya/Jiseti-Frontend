import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("access_token") || null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { access_token, user } = action.payload;
      state.user = user;
      state.token = access_token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null; 
      localStorage.removeItem("access_token");
      localStorage.removeItem("user"); 
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
