import {
    SET_PLAYLISTS,
    SET_SONG, NEXT_SONG,
    SET_SELECTED_PLAYLIST,
    RELOAD_GAME_STATE
} from "../types";

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
