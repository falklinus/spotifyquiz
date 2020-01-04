import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import TooltipButton from "./TooltipButton";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import SpotifyLogoWhite from "../../util/spotify_logo_white.png";

// Icons
import HomeIcon from "@material-ui/icons/Home";
import FastfoodIcon from "@material-ui/icons/Fastfood";

// Redux
import { logoutUser } from "../../redux/actions/userActions";
import { connect } from "react-redux";

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
          style={{ position: "relative", width: "100%", padding: 0 }}
        >
          <Fragment>
            <Link to="/" style={{ marginLeft: "10%" }}>
              <Button style={{ textTransform: "none", color: "#fff" }}>
                <img
                  style={{ height: 30, marginRight: "5%" }}
                  src={SpotifyLogoWhite}
                />
                SpotifyQuiz
              </Button>
            </Link>
            {authenticated && (
              <Button
                style={{ position: "absolute", right: "10%" }}
                color="inherit"
                onClick={() => {
                  this.handleLogout();
                }}
              >
                Logout
              </Button>
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
