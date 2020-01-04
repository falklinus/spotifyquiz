import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import SpotifyLogin from "../components/spotify/SpotifyLogin";




class home extends Component {
  componentDidMount() {}
  render() {
    return (
        <Fragment>
      <div>
        <p>You are on the home page</p>
      </div>
    <SpotifyLogin />
        </Fragment>
    );
  }
}

export default home;
