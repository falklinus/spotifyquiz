import {
  SET_PLAYLISTS,
  SET_SELECTED_PLAYLIST,
  SET_PLAYLIST_TRACKS,
  NEXT_SONG,
  SET_SONG
} from "../types";

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

export const setPlaylistTracks = playlist => dispatch => {
  axios.get(playlist.tracks.href).then(res => {
    console.log(res);
    dispatch({
      type: SET_PLAYLIST_TRACKS,
      payload: {
        tracks: res.data
      }
    });
  });
};

export const setSelectedPlaylist = playlist => dispatch => {
  dispatch({
    type: SET_SELECTED_PLAYLIST,
    payload: {
      data: playlist
    }
  });
};

export const setSong = song => dispatch => {
  dispatch({
    type: SET_SONG,
    payload: {
      data: song
    }
  });
};

export const nextSong = isNextSong => dispatch => {
  dispatch({
    type: NEXT_SONG,
    payload: {
      data: isNextSong
    }
  });
};
