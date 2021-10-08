import axios from "axios";

import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

export const login = (email, password) => (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("api/users/login", { email, password }, config)
    .then(({ data }) => {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((err) => {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("api/users/register", { name, email, password }, config)
    .then(({ data }) => {
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((err) => {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
    });
};

export const getUserDetails = (id) => (dispatch, getState) => {
  dispatch({
    type: USER_DETAILS_REQUEST,
  });
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  axios
    .get(`api/users/${id}`, config)
    .then(({ data }) => {
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
    });
};

export const updateUserProfile = (user) => (dispatch, getState) => {
  dispatch({
    type: USER_UPDATE_PROFILE_REQUEST,
  });
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  axios
    .put(`api/users/profile`, user, config)
    .then(({ data }) => {
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.response,
      });
    });
};
