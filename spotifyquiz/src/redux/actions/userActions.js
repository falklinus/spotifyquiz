import { SET_USER } from "../types";

import axios from "axios";

export const loginUser = token => dispatch => {
  setAuthorizationHeader(token);
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
