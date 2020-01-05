import {
  SET_PLAYLISTS,
  SET_SELECTED_PLAYLIST,
  RELOAD_GAME_STATE
} from "../types";
//import axios from "axios";

const initialState = {
  playlists: []
};

export default function(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case SET_PLAYLISTS:
      newState = { ...state, playlists: action.payload.data };
      localStorage.setItem("game", JSON.stringify(newState));
      return newState;
    case SET_SELECTED_PLAYLIST:
      newState = { ...state, selectedPlaylist: { ...action.payload } };
      localStorage.setItem("game", JSON.stringify(newState));
      return newState;
    case RELOAD_GAME_STATE:
      return action.payload.data;
    default:
      return state;
  }
}
