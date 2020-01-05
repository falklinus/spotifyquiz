import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_PLAYLISTS
} from "../types";
import axios from "axios";

const initialState = {
  playlists: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload.data
      };
    default:
      return state;
  }
}
