import React, { Component, Fragment } from "react";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import { connect } from "react-redux";
import {setSong, nextSong} from "../../redux/actions/gameActions";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import withStyles from "@material-ui/core/styles/withStyles";
import PauseIcon from '@material-ui/icons/Pause';


const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

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

  onSpotifyPlayerStateChanged(state) {
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

    this.props.setSong(currentTrack);

    // Make sure to update position
    clearInterval(this.interval);
    if (this.state.playing) {
      this.interval = setInterval(() => {
        if (this.state.position < this.state.duration) {
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
        this.onSpotifyPlayerStateChanged(state);
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
    if(this.props.game && this.props.game.isNextSong){
      this.onNextClick();
      this.props.nextSong(false);
    }

  }

  componentWillUnmount() {
    if (this.state.playing) {
      this.player.togglePlay().then(() => this.player.disconnect());
    } else {
      this.player.disconnect();
    }
  }

  onPrevClick = () => {
    this.player.previousTrack();
  };

  onPlayClick = () => {
    this.player.togglePlay();
  };

  onNextClick = () => {
    this.player.nextTrack();
  };

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
      playing,
    } = this.state;
    const {classes} = this.props;
    return (
        <Fragment>
          <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {trackName}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {artistName}
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="previous" onClick={this.onPrevClick}>
                  <SkipPreviousIcon />
                </IconButton>
                <IconButton aria-label="play/pause" onClick={this.onPlayClick}>
                  {!playing ?
                      (<PlayArrowIcon className={classes.playIcon} />) :
                      (<PauseIcon className={classes.playIcon} />)}
                </IconButton>
                <IconButton aria-label="next" onClick={this.onPrevClick}>
                  <SkipNextIcon />
                </IconButton>
              </div>
            </div>
            <CardMedia
                className={classes.cover}
                image="/static/images/cards/live-from-space.jpg"
                title="Live from space album cover"
            />
          </Card>
          {error && <p>Error: {error}</p>}




          {/* <div>
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
        </div>*/}
          <LinearProgress
              variant="determinate"
              value={(position / duration) * 100}
          />
        </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  game: state.game
});
export default connect(
    mapStateToProps,
    {setSong, nextSong}
)(withStyles(styles)(SpotifyPlayer));
