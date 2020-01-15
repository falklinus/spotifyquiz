import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';

const styles = theme => ({
  ...theme.spreadThis
});

export const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientId = '74c7667e428f44659fa14396a442d8ed';
const redirectUri = 'http://localhost:3000/';
const scopes = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
  'playlist-read-private',
  'playlist-read-collaborative'
];

// Get the hash of the url
let hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function(initial, item) {
    if (item) {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
// Remove token from Url
window.location.hash = '';

class SpotifyLogin extends Component {
  componentDidMount() {
    // Set token
    const spotifyToken = {
      access_token: hash.access_token,
      expires: Date.now() + hash.expires_in * 1000
    };
    console.log(spotifyToken);
    if (spotifyToken.access_token) {
      this.props.loginUser(spotifyToken);
      hash = '';
    }
  }

  render() {
    return (
      <Tooltip title="Login to spotify">
        <a
          href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            '%20'
          )}&response_type=token&show_dialog=true`}
        >
          <Button
            style={{ fontSize: 20, width: '50%' }}
            variant="contained"
            color="primary"
          >
            Login with spotify
          </Button>
        </a>
      </Tooltip>
    );
  }
}

export default connect(
  null,
  { loginUser }
)(withStyles(styles)(SpotifyLogin));
