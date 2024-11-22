import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'), // Check if there's a token in localStorage
  userRole: localStorage.getItem('userRole'), // Retrieve user role from localStorage
  token: localStorage.getItem('token'), // Retrieve token from localStorage
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      // Save token and userRole to localStorage on login
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);   // Store token in localStorage
      localStorage.setItem('userRole', action.payload.role); // Store role in localStorage
    },
    logout(state) {
      // Clear token and userRole from localStorage on logout
      state.isAuthenticated = false;
      state.userRole = null;
      state.token = null;
      localStorage.removeItem('token');   // Clear token from localStorage
      localStorage.removeItem('userRole'); // Clear role from localStorage
    },
    setToken(state, action) {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);  // Update token in localStorage
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
