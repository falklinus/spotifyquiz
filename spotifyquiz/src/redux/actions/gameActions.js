import { SET_PLAYLISTS } from "../types";

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
