import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '~/interfaces/user';

export interface AuthSlice {
  isAuthenticate: boolean;
  user: User | null;
}

const initialState: AuthSlice = {
  isAuthenticate: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticate = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticate = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
