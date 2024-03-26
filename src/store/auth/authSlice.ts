import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface User {
  "ok": boolean;
  "uid": string;
  "name": string;
  "token": string;
}

interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  user: User | null;
  errorMessage: string | null;
}

const initialState: AuthState = {
  status: 'checking',
  user: null,
  errorMessage: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    onCheking: ( state ) => {
      state.status = 'checking';
      state.user = null;
      state.errorMessage = null;
    },
    onLogin: ( state, { payload }: PayloadAction<User> ) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = null;
    },
    onLogout: ( state, { payload = null }: PayloadAction<string | null> ) => {
      state.status = 'not-authenticated';
      state.user = null;
      state.errorMessage = payload;
    },
    clearErrorMessage: ( state ) => {
      state.errorMessage = null;
    },
  },
});

export const { onCheking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;