import type { RootState } from '../redux.store';

export const selectAuthStatus = (state: RootState) => ({
  isLoading: state.auth.isLoading,
  isError: state.auth.isError,
  errorMessage: state.auth.errorMessage,
});
