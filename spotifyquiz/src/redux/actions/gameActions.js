import {NEXT_SONG, SET_PLAYLISTS, SET_SONG, SET_SELECTED_PLAYLIST} from "../types";

import axios from "axios";

export const setPlaylists = () => dispatch => {
  axios.get("https://api.spotify.com/v1/me/playlists").then(res => {
    console.log(res);
    dispatch({
      type: SET_PLAYLISTS,
      payload: {
        data: res.data.items
      }
    });
  });
};

export const setSong = (song) => dispatch => {
  dispatch({
    type: SET_SONG,
    payload: {
      data: song
    }
  })
};

export const nextSong = (isNextSong) => dispatch => {
  dispatch({
    type: NEXT_SONG,
    payload: {
      data: isNextSong
    }
  })
};
export const setSelectedPlaylist = playlist => dispatch => {
  axios.get(playlist.tracks.href).then(res => {
    console.log(res);
    dispatch({
      type: SET_SELECTED_PLAYLIST,
      payload: {
        data: playlist,
        tracks: res.data
      }
    });
  });
};
