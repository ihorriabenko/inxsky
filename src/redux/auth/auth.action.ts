import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import { UserSignIn, UserSignUp, User } from './auth.type';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData: UserSignUp, { rejectWithValue }) => {
    const { email, password, username } = userData;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      const { uid, displayName } = userCredential.user;

      return { userId: uid, username: displayName } as User;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (userData: UserSignIn, { rejectWithValue }) => {
    const { email, password } = userData;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid, displayName } = userCredential.user;

      return { userId: uid, username: displayName } as User;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('An unknown error occurred');
    }
  }
);
