import React, { Component } from 'react';
import SpotifyPlayer from '../components/spotify/SpotifyPlayer';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import { Card } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import stringSimilarity from 'string-similarity';
import Button from '@material-ui/core/Button';
import { amber, green, red } from '@material-ui/core/colors';
import { nextSong } from '../redux/actions/gameActions';

import './game.css';

const styles = theme => ({
  textField: { margin: '10px auto 10px auto' },
  submitButton: { margin: '10px 0' }
});

class game extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      songName: '',
      artistSimilarity: 0,
      songSimilarity: 0,
      score: 0,
      totalScore: 0,
      gamePaused: false,
      thisRoundScore: -1,
      nextSong: false,
      answerColor: 'fff',
      answerText: '',
      round: 1
    };
  }

  componentDidMount() {}

  cleanString = inputString => {
    return inputString
      .toLowerCase()
      .replace(/ /g, '')
      .replace(',', '')
      .split('-')[0]
      .split('(')[0];
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
    let songCorrect = false;
    let artistCorrect = false;

    this.setState({
      songCorrect,
      artistCorrect
    });
    if (this.state.songSimilarity >= 0.9) {
      tempRoundScore++;
      songCorrect = true;
    }
    if (this.state.artistSimilarity >= 0.9) {
      tempRoundScore++;
      artistCorrect = true;
    }
    this.setState(
      {
        totalScore: this.state.totalScore + 2,
        thisRoundScore: tempRoundScore,
        gamePaused: true,
        score: this.state.score + tempRoundScore,
        songSimilarity: 0,
        artistSimilarity: 0,
        songCorrect,
        artistCorrect
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
        gamePaused: false,
        round: this.state.round + 1
      },
      () => {
        this.setAnswer();
      }
    );
  };

  // #############################################################
  // ########## TODO: MAKE NICE SONG AND ARTIST SYMBOLS ##########
  // #############################################################

  setAnswer = () => {
    if (this.state.thisRoundScore === 0) {
      this.setState({
        answerColor: red[600],
        answerText: 'Too bad... 0/2 Points'
      });
    } else if (this.state.thisRoundScore === 1) {
      if (this.state.songCorrect)
        this.setState({ answerText: 'Song correct! 1/2 points' });
      else this.setState({ answerText: 'Artist correct! 1/2 points' });
      this.setState({
        answerColor: amber[700]
        //answerText: 'Artist or song correct! 1/2 Points'
      });
    } else if (this.state.thisRoundScore === 2) {
      this.setState({
        answerColor: green[600],
        answerText: 'Good job, totally correct! 2/2 Points'
      });
    } else {
      this.setState({ answerColor: '#ffff', answerText: '' });
    }
    this.setState({
      artistName: '',
      songName: ''
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Card
          className="gameCard"
          //  style={{ backgroundColor: this.state.answerColor }}
        >
          <div className="topContainer">
            <div className="js-start">
              <Button href="/">End Game</Button>
            </div>
            <Typography variant="h6" className="js-end">
              Total score {this.state.score} / {this.state.totalScore}
            </Typography>
          </div>

          {!this.state.gamePaused ? (
            <div>
              <Typography variant="h5">SONG {this.state.round}</Typography>
              <form noValidate autoComplete="off" className="gameForm">
                <TextField
                  className={classes.textField}
                  fullWidth
                  name="songName"
                  label="Song Name"
                  value={this.state.songName}
                  onChange={this.handleChange}
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  name="artistName"
                  label="Main Artist Name"
                  value={this.state.artistName}
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
              <Typography variant="h5">{this.state.answerText}</Typography>
              <Button
                onClick={this.onNextSong}
                className={classes.submitButton}
                variant="contained"
                color="primary"
              >
                Next Song!
              </Button>
            </div>
          )}
        </Card>
        <Typography variant="h5">
          Song Similarity: {this.state.songSimilarity}
          Artist Similarity: {this.state.artistSimilarity}
        </Typography>
        <SpotifyPlayer />
      </>
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
