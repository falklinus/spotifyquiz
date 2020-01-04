import React, { Component } from "react";
import SpotifyPlayer from "../components/spotify/SpotifyPlayer";
import { connect } from "react-redux";

class game extends Component {
  render() {
    return <SpotifyPlayer />;
  }
}

export default connect(
  null,
  null
)(game);
