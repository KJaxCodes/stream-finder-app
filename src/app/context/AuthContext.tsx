'use client';

// imports
import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

// types
type User = {
  id: string;
  email: string;
}

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// actions
// type LoginRequest = { type: 'LOGIN_REQUEST'; payload: { loading: boolean } };
// type SignupRequest = { type: 'SIGNUP_REQUEST'; payload: { loading: boolean } };
type AuthRequest = { type: 'AUTH_REQUEST'; payload: { loading: boolean, error: null } };
type LoginSuccess = { type: 'LOGIN_SUCCESS'; payload: { user: User; loading: boolean; error: null } };
type SignupSuccess = { type: 'SIGNUP_SUCCESS'; payload: { loading: boolean; error: null } };
type Logout = { type: 'LOGOUT'; payload: { loading: boolean; user: null; error: null } };
type AuthError = { type: 'AUTH_ERROR'; payload: { loading: boolean; error: string } };

// union type for all actions
type AuthAction = AuthRequest | LoginSuccess | SignupSuccess | Logout | AuthError;

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
}


// reducer function to handle state changes based on actions
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_REQUEST': {
      return { ...state, ...action.payload }
    }
    case 'LOGIN_SUCCESS': {
      return { ...state, ...action.payload }
    }
    case 'SIGNUP_SUCCESS': {
      return { ...state, ...action.payload }
    }
    case 'LOGOUT': {
      return { ...state, ...action.payload, user: null }
    }
    case 'AUTH_ERROR': {
      return { ...state, ...action.payload, user: null }
    }
    default:
      return state;
  }
};

// context interface definition
interface IAuthInterface extends AuthState {
  dispatchSignup: (email: string, password: string) => Promise<void>;
  dispatchLogin: (email: string, password: string) => Promise<void>;
  dispatchLogout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthInterface | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { ...initialState });

  // context functions
  async function dispatchSignup(email: string, password: string) {
    try {
      dispatch({ type: 'AUTH_REQUEST', payload: { loading: true, error: null } });
      // implement signup logic here
      // await axios.post('/api/users/signup', { email, password });
      dispatch({ type: 'SIGNUP_SUCCESS', payload: { loading: false, error: null } });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error, check [Auth Context]";
      dispatch({ type: 'AUTH_ERROR', payload: { loading: false, error: message } });
    }
  }

  async function dispatchLogin(email: string, password: string) {
    try {
      dispatch({ type: 'AUTH_REQUEST', payload: { loading: true, error: null } });
      // implement login logic here
      // const res = await axios.post('/api/users/login', { email, password });
      // const user: User = res.data;
      const mockUser: User = { id: '1', email:"user@mail.com" }; // mock user for demonstration
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: mockUser, loading: false, error: null } });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error, check [Auth Context]";
      dispatch({ type: 'AUTH_ERROR', payload: { loading: false, error: message } });
    }
  }

  async function dispatchLogout() {
    try {
      // implement logout logic here
      await axios.post('/api/users/logout');
      dispatch({ type: 'AUTH_REQUEST', payload: { loading: true, error: null } });
      dispatch({ type: 'LOGOUT', payload: { loading: false, user: null, error: null } });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error, check [Auth Context]";
      dispatch({ type: 'AUTH_ERROR', payload: { loading: false, error: message } });
    }
  }

  return (
    <AuthContext.Provider
      value={{ ...state, dispatchLogin, dispatchSignup, dispatchLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = (): IAuthInterface => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext could not be loaded at {AuthContext.tsx}");
  }
  return authContext;
}
export default AuthProvider;

