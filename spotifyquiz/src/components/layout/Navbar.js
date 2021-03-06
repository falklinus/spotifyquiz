import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import SpotifyLogoWhite from '../../util/spotify_logo_white.png';

// Redux
import { logoutUser } from '../../redux/actions/userActions';
import { connect } from 'react-redux';

export class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const { authenticated } = this.props.user;
    return (
      <AppBar>
        <Toolbar
          className="nav-container"
          style={{ position: 'relative', width: '100%', padding: 0 }}
        >
          <Fragment>
            <Button
              href="/"
              style={{
                textTransform: 'none',
                color: '#fff',
                marginLeft: '10%'
              }}
            >
              <img
                alt="spotifyLogoWhite"
                style={{ height: 30, marginRight: '5%' }}
                src={SpotifyLogoWhite}
              />
              SpotifyQuiz
            </Button>
            {authenticated && (
              <Link to="/" style={{ position: 'absolute', right: '10%' }}>
                <Button
                  style={{ color: '#fff' }}
                  onClick={() => {
                    this.handleLogout();
                  }}
                >
                  Logout
                </Button>
              </Link>
            )}
          </Fragment>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
