import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    errors: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const headers = {
    'Content-Type': 'application/json'
  };

  // generic function to handle errors from fetch api
  const handleErrors = response => {
    if (!response.ok) throw Error(response.statusText);
  }

  const loadUser = async () => {
    try {
      const res = await fetch('/auth', {method: "GET", headers: {'x-auth-token': localStorage.token}});
      handleErrors(res);
      const user = await res.json();
      dispatch({
        type: USER_LOADED,
        payload: user
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: AUTH_ERROR,
        payload: err
      })
    }
  };

  const register = async user => {
    try {
      const res = await fetch('/users', { method: "POST", headers, body: JSON.stringify(user) });
      handleErrors(res);
      const token = await res.json()
      dispatch({
        type: REGISTER_SUCCESS,
        payload: token
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: REGISTER_FAIL,
        payload: err
      });
    }
  };

  const login = async user => {
    try {
      const res = await fetch('/auth', { method: "POST", headers, body: JSON.stringify(user) });
      handleErrors(res);
      const token = await res.json();
      dispatch({
        type: LOGIN_SUCCESS,
        payload: token
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
        payload: err
      });
    }
  };

  const logout = () => {
    dispatch({
      type: LOGOUT
    })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user, 
        register,
        login,
        loadUser,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
