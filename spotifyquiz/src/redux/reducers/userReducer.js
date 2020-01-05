import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";
//import axios from "axios";

const initialState = {
  authenticated: false,
  access_token: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        access_token: action.payload.access_token
      };
    case SET_UNAUTHENTICATED:
      localStorage.removeItem("SpotifyToken");
      return initialState;
    default:
      return state;
  }
}
