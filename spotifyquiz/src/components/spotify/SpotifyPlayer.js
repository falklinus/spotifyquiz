import React, { Component, Fragment } from "react";
import axios from "axios";
import SpotifyLogin from "./SpotifyLogin";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

class SpotifyPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      deviceId: "",
      loggedIn: false,
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 0
    };
  }

  //Transfer the spotify user so that this website takes over and plays the current song
  transferPlaybackHere() {
    const { deviceId, token } = this.state;
    console.log(deviceId);
    axios
      .put(
        "https://api.spotify.com/v1/me/player",
        {
          device_ids: [deviceId],
          // To start playing when loaded
          play: true
        }
        /* {
          headers: { authorization: "Bearer " + token }
        } */
      )
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state == null) {
      clearInterval(this.interval);
      return;
    }
    const { duration, position } = state;
    const { current_track: currentTrack } = state.track_window;
    const trackName = currentTrack.name;
    const albumName = currentTrack.album.name;
    const artistName = currentTrack.artists
      .map(artist => artist.name)
      .join(", ");
    const playing = !state.paused;
    this.setState({
      position,
      duration,
      trackName,
      albumName,
      artistName,
      playing
    });

    clearInterval(this.interval);

    if (this.state.playing) {
      this.interval = setInterval(() => {
        if (this.state.position < this.state.duration) {
          console.log(1);
          this.setState({ position: (this.state.position += 1000) });
        } else {
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }

  componentDidMount() {
    // Add spotify Web SDK to Site
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new window.Spotify.Player({
        name: "Spotify Quiz",
        getOAuthToken: cb => {
          cb(this.props.user.access_token);
        }
      });
      // Error handling
      this.player.on("initialization_error", e => {
        console.error(e);
      });
      this.player.on("authentication_error", e => {
        console.error(e);
        this.setState({ loggedIn: false });
      });
      this.player.on("account_error", e => {
        console.error(e);
      });
      this.player.on("playback_error", e => {
        console.error(e);
      });

      // Playback status updates
      this.player.on("player_state_changed", state => {
        this.onStateChanged(state);
        console.log(state);
      });

      // Ready
      this.player.on("ready", data => {
        let { device_id } = data;
        console.log(data);
        console.log("Let the music play on!");
        this.setState({ deviceId: device_id });
        this.transferPlaybackHere();
      });

      // finally, connect!
      this.player.connect();
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.user.authenticated !== this.props.user.authenticated) {
      if (this.state.playing) {
        this.player.togglePlay().then(() => this.player.disconnect());
      } else {
        this.player.disconnect();
      }
    }
  }

  componentWillUnmount() {
    if (this.state.playing) {
      this.player.togglePlay().then(() => this.player.disconnect());
    } else {
      this.player.disconnect();
    }
  }

  onPrevClick() {
    this.player.previousTrack();
  }

  onPlayClick() {
    this.player.togglePlay();
  }

  onNextClick() {
    this.player.nextTrack();
  }

  render() {
    const {
      token,
      loggedIn,
      artistName,
      trackName,
      albumName,
      error,
      position,
      duration,
      playing
    } = this.state;
    return (
      <Fragment>
        <div>
          {error && <p>Error: {error}</p>}
          <p>Spotify Player</p>
          <div>
            <p>Artist: {artistName}</p>
            <p>Track: {trackName}</p>
            <p>Album: {albumName}</p>
            <p>Playing: {playing}</p>
            <p>Position: {position}</p>
            <p>Duration: {duration}</p>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.onPrevClick()}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.onPlayClick()}
          >
            {playing ? "Pause" : "Play"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.onNextClick()}
          >
            Next
          </Button>
        </div>
        <LinearProgress
          variant="determinate"
          value={(position / duration) * 100}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(SpotifyPlayer);
