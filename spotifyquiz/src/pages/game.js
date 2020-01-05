import React, { Component } from "react";
import SpotifyPlayer from "../components/spotify/SpotifyPlayer";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import { Card } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import stringSimilarity from "string-similarity";

const styles = theme => ({
  card: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  textField: { margin: "10px auto 10px auto" }
});

class game extends Component {
  constructor() {
    super();
    this.state = {
      artistName: "",
      songName: "",
      artistSimilarity: 0,
      songSimilarity: 0
    };
  }

  componentDidMount() {
    console.log(stringSimilarity.compareTwoStrings("teest", "test"));
  }

  cleanString = input => {
    return input
      .replace(/ /g, "")
      .toLowerCase()
      .split("-")[0]
      .split("(")[0];
  };

  handleChange = event => {
    event.preventDefault();
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        this.setState({
          songSimilarity: stringSimilarity.compareTwoStrings(
            this.cleanString(this.state.songName),
            "Summer".toLowerCase()
          )
        });
      }
    );
  };
  /* this.setState({
      songSimilarity: stringSimilarity.compareTwoStrings(
        this.state.songName,
        "Never Letting Go"
      ),
      artistSimilarity: stringSimilarity.compareTwoStrings(
        this.state.artistName,
        "Audien, ARTY"
      )
    }); */

  render() {
    const { classes } = this.props;
    return (
      <div>
        <SpotifyPlayer />
        <Container component="main" maxWidth="md">
          <Card className={classes.card}>
            <Typography component="h1" variant="h4">
              Guess Artist and Song
            </Typography>
            <form noValidate autoComplete="off" className={classes.form}>
              <TextField
                className={classes.textField}
                fullWidth
                name="artistName"
                label="Artist"
                helperText="separate with ,"
                value={this.state.artistName}
                onChange={this.handleChange}
              />
              <TextField
                className={classes.textField}
                fullWidth
                name="songName"
                label="Song"
                value={this.state.songName}
                onChange={this.handleChange}
              />
            </form>
          </Card>
          <span>Songsim{this.state.songSimilarity}</span>
          <Typography component="h1" variant="h5">
            Song Similarity: {this.state.songSimilarity}
            Artist Similarity: {this.state.artistSimilarity}
          </Typography>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(game));
