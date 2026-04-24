import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types';
import { DEFAULT_TOKEN_KEY } from '@/config';

const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem(DEFAULT_TOKEN_KEY) : null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem(DEFAULT_TOKEN_KEY, token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem(DEFAULT_TOKEN_KEY);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
    },
  },
});

export const { setCredentials, logout, setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
