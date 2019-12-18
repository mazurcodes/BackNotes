import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const headers = {
    'Content-Type': 'application/json'
  };

  const register = async user => {
    console.log("auth: ", user);
    try {
      const res = await fetch('/users', { method: "POST", headers, body: JSON.stringify(user) });
      const token = await res.json()
      console.log(token);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: token
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: REGISTER_FAIL
      });
    }
  };

  const login = async user => {
    try {
      const res = await fetch('/auth', { method: "POST", headers, body: JSON.stringify(user) });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: JSON.parse(res)
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user, 
        register,
        login
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
