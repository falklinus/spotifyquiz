import {
  SET_PLAYLISTS,
  SET_SELECTED_PLAYLIST,
  RELOAD_GAME_STATE,
  SET_PLAYLIST_TRACKS
} from "../types";
//import axios from "axios";

const initialState = {
  playlists: [],
  selectedPlaylist: {
    data: {},
    tracks: []
  }
};

export default function(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case SET_PLAYLISTS:
      newState = { ...state, playlists: action.payload.data };
      localStorage.setItem("game", JSON.stringify(newState));
      return newState;
    case SET_SELECTED_PLAYLIST:
      newState = {
        ...state,
        selectedPlaylist: {
          ...state.selectedPlaylist,
          data: action.payload.data
        }
      };
      localStorage.setItem("game", JSON.stringify(newState));
      return newState;
    case SET_PLAYLIST_TRACKS:
      newState = {
        ...state,
        selectedPlaylist: {
          ...state.selectedPlaylist,
          tracks: action.payload.tracks
        }
      };
      localStorage.setItem("game", JSON.stringify(newState));
      return newState;
    case RELOAD_GAME_STATE:
      return action.payload.data;
    default:
      return state;
  }
}
