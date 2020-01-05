import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import axios from "axios";
import { setPlaylists } from "../../redux/actions/gameActions";

const styles = theme => ({
  //...theme.spreadThis,
  root: {
    flexGrow: 1,
    padding: "0 50px"
  },
  paper: {
    //padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary
  },
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    width: "100%",
    objectFit: "cover"
  },
  content: {
    width: "100%",
    //padding: 25,
    textAlign: "center"
  }
});

class AlbumList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.setPlaylists();
  }

  render() {
    const { playlists } = this.props.game;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {playlists.map(playlist => {
            return (
              <Grid key={playlist.id} item sm={3}>
                <Card className={classes.card}>
                  <CardActionArea>
                    {playlist.images ? (
                      <img
                        className={classes.image}
                        src={playlist.images[0].url}
                      />
                    ) : null}
                    <CardContent
                      style={{
                        minHeight: 40,
                        padding: 5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                      }}
                    >
                      <Typography variant="body2">
                        <b>{playlist.name}</b>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
});

const mapActionsToProps = {
  setPlaylists
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(AlbumList));
