import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/index';

export interface AuthSlice {
  isAuthenticate: boolean;
  user: IUser | null;
}

const initialState: AuthSlice = {
  isAuthenticate: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
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
