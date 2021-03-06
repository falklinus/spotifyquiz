import React, { Component } from 'react';
//import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import SpotifyLogin from '../components/spotify/SpotifyLogin';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SpotifyLogoBlack from '../util/spotify_logo_black.png';
import AlbumList from '../components/spotify/AlbumList';

class home extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.setState({
      game_id: 123
    });
  }
  render() {
    const { authenticated } = this.props.user;
    return (
      <div
        style={{
          textAlign: 'center'
        }}
      >
        {/* <Grid item sm /> */}
        {/* <Grid item style={{ textAlign: "center" }}> */}
        {/* <img
          style={{ height: 100, width: 100 }}
          src={SpotifyLogoBlack}
          alt="spotifyLogo"
        />*/}

        {authenticated ? (
          <div>
            <h1 style={{ padding: 20 }}>
              Choose a playlist to quiz yourself on
            </h1>
            <AlbumList />
          </div>
        ) : (
          <div>
            <br />
            <SpotifyLogin />
          </div>
        )}
        {/* </Grid> */}
        {/* <Grid item sm /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(home);
