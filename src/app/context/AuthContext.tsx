'use client';

import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import type { ReactNode } from 'react';
//api functions
import { handleLogin, handleSignup } from '../components/auth_components/frontend_api_components/authFunctions';

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
  user: null, loading: false, error: null
};

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
  dispatchSignup: (email: string, password: string) => Promise<boolean>;
  dispatchLogin: (email: string, password: string) => Promise<boolean>;
  dispatchLogout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthInterface | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { ...initialState });

  // context functions
  async function dispatchSignup(email: string, password: string): Promise<boolean> {
    try {
      dispatch({ type: 'AUTH_REQUEST', payload: { loading: true, error: null } });
      // implement signup logic here
      const success = await handleSignup(email, password);
      // signup failed, don't have validations yet (probably a duplicate user, fix later)
      if (!success) {
        dispatch({ type: 'AUTH_ERROR', payload: { loading: false, error: "Signup failed" } });
        return false;
      }
      // signup successful
      dispatch({ type: 'SIGNUP_SUCCESS', payload: { loading: false, error: null } });
      // we should redirect to login page after signup, but can't do that here
      return true;
    } catch (error: unknown) {
      // any unexpected errors
      const message = error instanceof Error ? error.message : "Unknown error, check [Auth Context]";
      dispatch({ type: 'AUTH_ERROR', payload: { loading: false, error: message } });
      return false;
    }
  }

  async function dispatchLogin(email: string, password: string): Promise<boolean> {
    try {
      dispatch({ type: 'AUTH_REQUEST', payload: { loading: true, error: null } });
      // implement login logic here
      // const res = await axios.post('/api/users/login', { email, password });
      // const user: User = res.data;
      const { success, user, message } = await handleLogin(email, password);
      // const mockUser: User = { id: '1', email: "user@mail.com" }; // mock user for demonstration
      if (!success || !user) {
        dispatch({ type: 'AUTH_ERROR', payload: { loading: false, error: message || "Login failed" } });
        return false;
      }
      // login successful
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: user, loading: false, error: null } });
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error, check [Auth Context]";
      dispatch({ type: 'AUTH_ERROR', payload: { loading: false, error: message } });
      return false;
    }
  }

  async function dispatchLogout() {
    try {
      dispatch({ type: 'AUTH_REQUEST', payload: { loading: true, error: null } });
      // implement logout logic here
      // await axios.post('/api/users/logout');

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

