import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubHeader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
//import { setTracks } from "../redux/actions/gameActions";

const styles = theme => ({
  root: {
    padding: "0 25px"
  },
  image: {
    objectFit: "cover",
    width: "100%"
  },
  column: {
    padding: "0 20px 50px 20px",
    overflow: "auto",
    maxHeight: "85vh",
    margin: "auto"
  },
  columnHead: {
    maxWidth: 200,
    margin: "auto"
  }
});

class createGame extends Component {
  constructor() {
    super();
    this.state = {
      playlist: {}
    };
  }

  componentDidMount() {
    //this.props.setTracks();
    console.log(this.props.game.selectedPlaylist);
    const playlist = this.props.game.selectedPlaylist;
    this.setState({
      playlist: playlist
    });
    /* this.setState({
      playlist: {
        list: playlist,
        tracks: tracks
      }
    }); */
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        {this.state.playlist && (
          <Grid item className={classes.column}>
            {this.state.playlist.data && (
              <div className={classes.columnHead}>
                <img
                  alt="coverImage"
                  className={classes.image}
                  src={this.state.playlist.data.images[0].url}
                />
                {this.state.playlist.data && (
                  <Typography variant="h5" style={{ textAlign: "center" }}>
                    {this.state.playlist.data.name}
                  </Typography>
                )}
              </div>
            )}

            <List className={classes.listRoot}>
              <ListSubHeader sm={4} style={{ margin: "auto", maxWidth: 300 }}>
                <Button variant="contained" color="primary" fullWidth>
                  Create Game
                </Button>
              </ListSubHeader>
              {this.state.playlist.tracks
                ? this.state.playlist.tracks.items.map(song => {
                    return (
                      <>
                        <ListItem button key={song.track.id}>
                          <ListItemText primary={song.track.name} />
                        </ListItem>
                        <Divider />
                      </>
                    );
                  })
                : console.log("hejsan")}
            </List>
          </Grid>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(createGame));
