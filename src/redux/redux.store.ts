import { configureStore, Middleware} from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger as Middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
