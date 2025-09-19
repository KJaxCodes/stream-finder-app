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
type LoginRequest = { type: 'LOGIN_REQUEST'; payload: { loading: boolean } };
type SignupRequest = { type: 'SIGNUP_REQUEST'; payload: { loading: boolean } };
type LoginSuccess = { type: 'LOGIN_SUCCESS'; payload: { user: User; loading: boolean; error: null } };
type SignupSuccess = { type: 'SIGNUP_SUCCESS'; payload: { loading: boolean; error: null } };
type Logout = { type: 'LOGOUT'; payload: { loading: boolean; error: null } };
type AuthError = { type: 'AUTH_ERROR'; payload: { loading: boolean; error: string } };

// union type for all actions
type AuthAction = LoginRequest | SignupRequest | LoginSuccess | SignupSuccess | Logout | AuthError;

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
}


// reducer function to handle state changes based on actions
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST': {
      return { ...state, ...action.payload }
    }
    case 'SIGNUP_REQUEST': {
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
  logout: () => Promise<void>;
}

// create context
const AuthContext = createContext<IAuthInterface | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // check if user is logged in on initial load


  // context value functions
  async function dispatchSignup(email: string, password: string) {
    try {
      dispatch({ type: 'SIGNUP_REQUEST', payload: { loading: true } });
      // implement signup logic here
      await axios.post('/api/users/signup', { email, password });
      dispatch({ type: 'SIGNUP_SUCCESS', payload: { loading: false, error: null } });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error, check [Auth Context]";
      dispatch({ type: 'AUTH_ERROR', payload: { loading: false, error: message } });
    }
  }

  async function dispatchLogin(email: string, password: string) {
    try {
      dispatch({ type: 'LOGIN_REQUEST', payload: { loading: true } });
      // implement login logic here
      const res = await axios.post('/api/users/login', { email, password });
      const user: User = res.data;
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, loading: false, error: null } });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error, check [Auth Context]";
      dispatch({ type: 'AUTH_ERROR', payload: { loading: false, error: message } });
    }
  }

  async function logout() {
    try {
      // implement logout logic here
      await axios.post('/api/users/logout');
      dispatch({ type: 'LOGOUT', payload: { loading: false, error: null } });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error, check [Auth Context]";
      dispatch({ type: 'AUTH_ERROR', payload: { loading: false, error: message } });
    }
  }

  return (
    <AuthContext.Provider
      value={{ ...state, dispatchLogin, dispatchSignup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

