import type { RootState } from '../redux.store';

export const selectAuthStatus = (state: RootState) => ({
  isLoading: state.auth.isLoading,
  isError: state.auth.isError,
  errorMessage: state.auth.errorMessage,
});

export const selectUserId = (state: RootState) => state.auth.user.userId;
export const selectUsername = (state: RootState) => state.auth.user.username;
