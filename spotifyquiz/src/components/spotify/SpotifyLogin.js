import React, { Component } from "react";
import logo from "./../../logo.svg";
import axios from 'axios';



import Grid from "@material-ui/core/Grid";
import SpotifyPlayer from "./SpotifyPlayer";

export const authEndpoint = 'https://accounts.spotify.com/authorize?';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "74c7667e428f44659fa14396a442d8ed";
const redirectUri = "http://localhost:3000/";
const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
];
// Get the hash of the url
const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
        if (item) {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
// Remove token from Url
window.location.hash = "";


class SpotifyLogin extends Component {
    constructor() {
        super();
        this.state = {
            token: null,
            item: {
                album: {
                    images: [{ url: "" }]
                },
                name: "",
                artists: [{ name: "" }],
                duration_ms:0,
            },
            is_playing: "Paused",
            progress_ms: 0
        };
        this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    }

    getCurrentlyPlaying() {
        // Make a call using the token
        const url = "https://api.spotify.com/v1/me/player";
        const urlPlaylist = "https://api.spotify.com/v1/me/playlists";

        axios.get(url, {headers:{"Authorization": "Bearer " + this.state.token}}).then(res=>res.data).then(data => {
            console.log(data);
            this.setState({
                item: data.item,
                is_playing: data.is_playing,
                progress_ms: data.progress_ms,
            });
        }).catch(error => {
            console.log(error);
        });

    }


    componentDidMount() {
        // Set token
        const _token = hash.access_token;
        const spotifyToken = {
            access_token: hash.access_token,
            expires_in: hash.expires_in
        };

        if (_token) {
            // Set token
            this.setState({
                token: _token,
                expires_in:hash.expires_in,
                spotifyToken: spotifyToken
            });
            this.getCurrentlyPlaying();
        }
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    {!this.state.token && (
                        <a
                            className="btn btn--loginApp-link"
                            href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
                        >
                            Login to Spotify
                        </a>
                    )}
                    {this.state.token && (
                        <SpotifyPlayer
                            item={this.state.item}
                            is_playing={this.state.is_playing}
                            progress_ms={this.progress_ms}
                        />
                        // Spotify Player Will Go Here In the Next Step
                    )}
                    <button onClick={ () =>{this.getCurrentlyPlaying()}}>Update</button>
                </header>
            </div>
        );
    }
}

export default SpotifyLogin;