import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SpotifyLogin from "../components/spotify/SpotifyLogin";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SpotifyLogoBlack from "../util/spotify_logo_black.png";

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
          textAlign: "center",
          marginTop: 200
        }}
      >
        {/* <Grid item sm /> */}
        {/* <Grid item style={{ textAlign: "center" }}> */}
        <img style={{ height: 100, width: 100 }} src={SpotifyLogoBlack} />
        <h1>SpotifyQuiz</h1>
        {authenticated ? (
          <div>
            <br />
            <Link to={`/game/${this.state.game_id}`}>
              <Button
                style={{ fontSize: 20, width: "50%" }}
                variant="contained"
                color="primary"
              >
                Create Quiz
              </Button>
            </Link>
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
