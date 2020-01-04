import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";

import axios from "axios";

export const loginUser = token => dispatch => {
  console.log(token);
  setAuthorizationHeader(token);
  dispatch({
    type: SET_AUTHENTICATED,
    payload: token
  });
};

export const logoutUser = () => dispatch => {
  console.log("försöker logga ut");
  //window.location.href = "/";
  localStorage.removeItem("SpotifyToken");
  dispatch({
    type: SET_UNAUTHENTICATED
  });
  console.log(localStorage.getItem("SpotifyToken"));
};

const setAuthorizationHeader = token => {
  localStorage.setItem("SpotifyToken", JSON.stringify(token));
  const headerToken = `Bearer ${token.access_token}`;
  axios.defaults.headers.common["Authorization"] = headerToken;
};
