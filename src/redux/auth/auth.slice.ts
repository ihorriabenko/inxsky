import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Auth, User } from './auth.type';
import { signIn, signOut, signUp } from './auth.action';

const initialState: Auth = {
  user: {
    userId: '',
    username: '',
  },
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Cases
    builder.addCase(signOut.fulfilled, (state) => {
      state.user.userId = '';
      state.user.username = '';
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = '';
    });
    // Matchers
    builder.addMatcher(isPending(signIn, signUp), (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = '';
    });
    builder.addMatcher(
      isFulfilled(signIn, signUp),
      (state, { payload }: PayloadAction<User>) => {
        const { userId, username } = payload;

        state.user.userId = userId;
        state.user.username = username;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = '';
      }
    );
    builder.addMatcher(isRejected(signIn, signUp), (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message || 'Failed to authentication';
    });
  },
});

export default authSlice.reducer;
