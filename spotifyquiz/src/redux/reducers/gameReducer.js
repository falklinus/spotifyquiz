import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_PLAYLISTS,
  SET_SONG, NEXT_SONG
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
    case SET_SONG:
      return {
        ...state,
        song:action.payload.data
      };
    case NEXT_SONG:
      return {
        ...state,
        isNextSong:action.payload.data
      };
    default:
      return state;
  }
}
