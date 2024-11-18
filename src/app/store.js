import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
// import navbarSlice from '../features/navbar/navbarSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // navbar: navbarSlice,
  },
});