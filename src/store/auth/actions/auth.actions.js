import { AUTH_ACTION_TYPES } from "../constants";

export const loginRequest = () => ({
  type: AUTH_ACTION_TYPES.LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: AUTH_ACTION_TYPES.LOGIN_FAILURE,
  payload: error,
});

export const registerRequest = () => ({
  type: AUTH_ACTION_TYPES.REGISTER_REQUEST,
});

export const registerSuccess = (user) => ({
  type: AUTH_ACTION_TYPES.REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: AUTH_ACTION_TYPES.REGISTER_FAILURE,
  payload: error,
});

export const logoutSuccess = (user) => ({
  type: AUTH_ACTION_TYPES.LOGOUT_SUCCESS,
  payload: user,
});
