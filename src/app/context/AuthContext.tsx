'use client';

import React, { createContext, useContext, useState,  useReducer } from 'react';
import type { ReactNode } from 'react';
// api functions
import { handleSignup, handleLogin, handleLogout } from '../components/auth_components/frontend_api_components/authFunctions';
// types
import type { UserTokenData } from "@/app/types/shared/types";

type AuthState = {
  user:     UserTokenData | null;
  loading:  boolean;
  error:    string | null;
}

// actions 
// type LoginRequest = { type: "LOGIN_REQUEST", payload: { loading: boolean; }};
// type SignupRequest = { type: "SIGNUP_REQUEST", payload: { loading: boolean }};
type AuthRequest = { type: "AUTH_REQUEST", payload: { loading: boolean; error: null }};
type LoginSuccess = { type: "LOGIN_SUCCESS", payload: { user: UserTokenData; loading: boolean, error: null; }};
type SignupSuccess = { type: "SIGNUP_SUCCESS", payload: { loading: boolean; error: null; }};
type Logout = { type: "LOGOUT", payload: { loading: boolean; user: null; error: null; }}
type AuthError = { type: "AUTH_ERROR", payload: { loading: boolean; error: string; }};

type AuthAction = AuthRequest | LoginSuccess | SignupSuccess | Logout | AuthError;

const initialState: AuthState = {
  user: null, loading: false, error: null,
};

const authreducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_REQUEST": {
      return { ...state, ...action.payload };
    }
    case "SIGNUP_SUCCESS": {
      return { ...state, ...action.payload };
    }
    case "LOGIN_SUCCESS": {
      return { ...state, ...action.payload };
    }
    case "LOGOUT": {
      return { ...state, ...action.payload };
    }
    case "AUTH_ERROR": {
      return { ...state, ...action.payload };
    }
    default: 
      return state;
  }
};

interface IAuthInterface extends AuthState {
  dispatchSignup: (email: string, password: string) => Promise<boolean>;
  dispatchLogin: (email: string, password: string) => Promise<boolean>;
  dispatchLogout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthInterface | null>(null);

const AuthProvider = ({ children, initialUser = null }: { children: ReactNode; initialUser: UserTokenData | null; }) => {
  const [ state, dispatch ] = useReducer(authreducer, { ...initialState, user: initialUser });

  async function dispatchSignup(email: string, password: string): Promise<boolean> {
    try {
      dispatch({ type: "AUTH_REQUEST", payload: { loading: true, error: null } });
      // this is going to be the axios request
      const success = await handleSignup(email, password);

      // signup failed, don't have validations yet (probably a duplicate user, fix later)
      if (!success) {
        dispatch({ type: "AUTH_ERROR", payload: { loading: false, error: "Signup failed" }});
        return false;
      }
      dispatch({ type: "SIGNUP_SUCCESS", payload: { loading: false, error: null } });
      // we should redirect to login page after signup
      return true;
    } catch (error: unknown) {
      // any unexpected error
      const message = error instanceof Error ? error.message : "Unknown error, check [AuthContext]";
      dispatch({ type: "AUTH_ERROR", payload: { loading: false, error: message }});
      return false;
    }
  }

  async function dispatchLogin(email: string, password: string): Promise<boolean> {
    try {
      dispatch({ type: "AUTH_REQUEST", payload: { loading: true, error: null } });
      // implement  LOGIN logic here
      // this is going to be the axios request
      const { success, message, user } = await handleLogin(email, password);
      //const mockUser: User = { id: 1, email: "user@mail.com" };
      if (!success || !user) {
        dispatch({ type: "AUTH_ERROR", payload: { loading: false, error: message || "Login failed" }});
        return false;
      }
      // login successful
      dispatch({ type: "LOGIN_SUCCESS", payload: { loading: false, user: user,  error: null } });
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error, check [AuthContext]";
      dispatch({ type: "AUTH_ERROR", payload: { loading: false, error: message }});
      return false;
    }
  }

  async function dispatchLogout() {
    try {
      dispatch({ type: "AUTH_REQUEST", payload: { loading: true, error: null } });
      // do logout //
      dispatch({ type: "LOGOUT", payload: { loading: false, user: null, error: null } })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error, check [AuthContext]";
      dispatch({ type: "AUTH_ERROR", payload: { loading: false, error: message }});
    }
  }

 
  return (
    <AuthContext.Provider value={{ ...state, dispatchLogin, dispatchSignup, dispatchLogout }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuthContext = (): IAuthInterface => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext could not be loaded at {AuthContext.tsx}");

  return authContext;
};

export default AuthProvider;