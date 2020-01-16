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

import HighlightOff from '@material-ui/icons/HighlightOff';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import './game.css';

const styles = theme => ({
  textField: {
    margin:
      window.innerHeight > 568 ? '50px auto 20px auto' : '30px auto 20px auto'
  },
  submitButton: { margin: '20px 0' },
  answerText: {
    margin: '0 15px 0 0px',
    flexGrow: '2'
  }
});

class game extends Component {
  constructor(props) {
    super(props);
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
      round: 1,
      windowWidth: 0,
      windowHeight: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }

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
        answerColor: 'rgba(252, 219, 219, 0.564)',
        answerText: 'Too bad... 0/2 Points',
        answerSymbol: 'red'
      });
    } else if (this.state.thisRoundScore === 1) {
      if (this.state.songCorrect)
        this.setState({ answerText: 'Song correct! 1/2 points' });
      else this.setState({ answerText: 'Artist correct! 1/2 points' });
      this.setState({
        answerColor: 'rgba(252, 251, 219, 0.564)',
        answerSymbol: 'yellow'
        //answerText: 'Artist or song correct! 1/2 Points'
      });
    } else if (this.state.thisRoundScore === 2) {
      this.setState({
        answerColor: 'rgba(219, 252, 227, 0.564)',
        answerText: 'Good job, totally correct! 2/2 Points',
        answerSymbol: 'green'
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
    let answerSymbol;
    if (this.state.answerSymbol === 'red') {
      answerSymbol = (
        <HighlightOff color="secondary" style={{ fontSize: '40px' }} />
      );
    } else if (this.state.answerSymbol === 'yellow') {
      answerSymbol = (
        <CheckCircleOutline style={{ fontSize: '40px', color: '#fdd835' }} />
      );
    } else if (this.state.answerSymbol === 'green') {
      answerSymbol = (
        <CheckCircleOutline color="primary" style={{ fontSize: '40px' }} />
      );
    }

    let topContainerMarkup = (
      <div className="topContainer">
        <div className="end_game">
          <Button href="/">End Game</Button>
        </div>
        <p className="score">
          TOTAL SCORE <br /> {this.state.score} / {this.state.totalScore}
        </p>
      </div>
    );

    let gameMarkup;

    if (!this.state.gamePaused) {
      gameMarkup = (
        <>
          {topContainerMarkup}
          <div>
            <Typography variant="h3">SONG {this.state.round}</Typography>
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
        </>
      );
    } else {
      gameMarkup = (
        <>
          {topContainerMarkup}
          <div>
            <Card
              className="answerResponse"
              style={{
                borderRadius: '20px',
                backgroundColor: `${this.state.answerColor}`
              }}
            >
              {answerSymbol}
              <Typography variant="body2" className={classes.answerText}>
                {this.state.answerText}
              </Typography>
            </Card>
            <Typography variant="body2">Wait for the next round</Typography>
            <Button
              onClick={this.onNextSong}
              className={classes.submitButton}
              variant="contained"
              color="primary"
            >
              Next Song!
            </Button>
          </div>
        </>
      );
    }

    return (
      <>
        {this.state.windowWidth < 768 ? (
          <div className="gameCard">{gameMarkup}</div>
        ) : (
          <Card className="gameCard">{gameMarkup}</Card>
        )}

        {/* <Typography variant="h5">
          Song Similarity: {this.state.songSimilarity}
          Artist Similarity: {this.state.artistSimilarity}
        </Typography> */}
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
