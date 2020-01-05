import React, { Component } from "react";
import SpotifyPlayer from "../components/spotify/SpotifyPlayer";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import { Card } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import stringSimilarity from "string-similarity";
import Button from "@material-ui/core/Button";
import { amber, green, red } from "@material-ui/core/colors";
import { nextSong } from "../redux/actions/gameActions";

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
  textField: { margin: "10px auto 10px auto" },
  submitButton: { marginBottom: "10px" }
});

class game extends Component {
  constructor() {
    super();
    this.state = {
      artistName: "",
      songName: "",
      artistSimilarity: 0,
      songSimilarity: 0,
      score: 0,
      totalScore: 0,
      gamePaused: false,
      thisRoundScore: -1,
      nextSong: false,
      answerColor: "fff",
      answerText: ""
    };
  }

  componentDidMount() {}

  cleanString = inputString => {
    return inputString
      .toLowerCase()
      .replace(/ /g, "")
      .replace(",", "")
      .split("-")[0]
      .split("(")[0];
  };

  handleChange = event => {
    //event.preventDefault();
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        if (!this.props.game) return;
        /*  const artistNames = this.props.game.song.artists
                  .map(artist => artist.name)
                  .join(", ");*/
        this.setState({
          songSimilarity: stringSimilarity.compareTwoStrings(
            this.cleanString(this.state.songName),
            this.cleanString(this.props.game.song.name)
          )
        });
        this.setState({
          artistSimilarity: stringSimilarity.compareTwoStrings(
            this.cleanString(this.state.artistName),
            this.cleanString(this.props.game.song.artists[0].name)
          )
        });
      }
    );
  };

  onSubmit = event => {
    let tempRoundScore = 0;
    if (this.state.songSimilarity >= 0.9) {
      tempRoundScore++;
    }
    if (this.state.artistSimilarity >= 0.9) {
      tempRoundScore++;
    }
    this.setState(
      {
        totalScore: (this.state.totalScore += 2),
        thisRoundScore: tempRoundScore,
        gamePaused: true,
        score: this.state.score + tempRoundScore,
        songSimilarity: 0,
        artistSimilarity: 0
      },
      () => {
        this.setAnswer();
      }
    );
  };

  onNextSong = event => {
    this.props.nextSong(true);
    this.setState(
      {
        thisRoundScore: -1,
        gamePaused: false
      },
      () => {
        this.setAnswer();
      }
    );
  };

  setAnswer = () => {
    if (this.state.thisRoundScore === 0) {
      this.setState({
        answerColor: red[600],
        answerText: "Too bad... 0/2 Points"
      });
    } else if (this.state.thisRoundScore === 1) {
      this.setState({
        answerColor: amber[700],
        answerText: "Artist or Song Correct! 1/2 Points"
      });
    } else if (this.state.thisRoundScore === 2) {
      this.setState({
        answerColor: green[600],
        answerText: "Good Job, totally correct! 2/2 Points"
      });
    } else {
      this.setState({ answerColor: "#ffff", answerText: "" });
    }
    this.setState({
      artistName: "",
      songName: ""
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container component="main" maxWidth="md">
          <Card
            className={classes.card}
            style={{ backgroundColor: this.state.answerColor }}
          >
            <Typography component="h1" variant="h4">
              Overall Score: {this.state.score} / {this.state.totalScore}
            </Typography>
            {!this.state.gamePaused ? (
              <div>
                <Typography component="h1" variant="h4">
                  Guess Artist and Song
                </Typography>
                <form noValidate autoComplete="off" className={classes.form}>
                  <TextField
                    className={classes.textField}
                    fullWidth
                    name="artistName"
                    label="Main Artist Name"
                    value={this.state.artistName}
                    onChange={this.handleChange}
                  />
                  <TextField
                    className={classes.textField}
                    fullWidth
                    name="songName"
                    label="Song Name"
                    value={this.state.songName}
                    onChange={this.handleChange}
                  />
                  <Button
                    onClick={this.onSubmit}
                    className={classes.submitButton}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit!
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                <Typography variant="h4">{this.state.answerText}</Typography>
                <Button
                  onClick={this.onNextSong}
                  className={classes.submitButton}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Next Song!
                </Button>
              </div>
            )}
          </Card>
          <Typography component="h1" variant="h5">
            Song Similarity: {this.state.songSimilarity}
            Artist Similarity: {this.state.artistSimilarity}
          </Typography>
        </Container>
        <SpotifyPlayer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
});

export default connect(
  mapStateToProps,
  { nextSong }
)(withStyles(styles)(game));
