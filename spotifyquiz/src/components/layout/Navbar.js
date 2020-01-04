import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import TooltipButton from "./TooltipButton";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import HomeIcon from "@material-ui/icons/Home";
import FastfoodIcon from "@material-ui/icons/Fastfood";

export class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar className="nav-container">
          <Fragment>
            <Link to="/">
              <TooltipButton tip="Home">
                <HomeIcon />
              </TooltipButton>
            </Link>
            <Link to="/meal">
              <TooltipButton tip="Create Meal">
                <FastfoodIcon />
              </TooltipButton>
            </Link>
          </Fragment>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
