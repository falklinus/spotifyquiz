import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import equal from 'fast-deep-equal';
import { Link } from 'react-router-dom';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubHeader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import ArrowBack from '@material-ui/icons/ArrowBack';
import StandardAlbumImage from '../util/standard_album_image.png';

import './createGame.css';

// Redux
import { connect } from 'react-redux';
//import { setTracks } from "../redux/actions/gameActions";

const styles = theme => ({
  image: {
    objectFit: 'cover',
    width: '100%'
  },
  column: {
    padding: '0 20px 50px 20px',
    overflow: 'auto',
    maxHeight: '85vh',
    margin: 'auto'
  },
  columnHead: {
    maxWidth: 200,
    margin: 'auto'
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
    console.log(this.props.game.selectedPlaylist);
    const playlist = this.props.game.selectedPlaylist;
    this.setState({
      playlist: playlist
    });
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (
      !equal(prevProps.game.selectedPlaylist, this.props.game.selectedPlaylist)
    ) {
      console.log(this.props.game.selectedPlaylist);
      const playlist = this.props.game.selectedPlaylist;
      this.setState({
        playlist: playlist
      });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid container>
          {this.state.playlist && (
            <Grid item className={classes.column}>
              <Link to='/'>
                <Button
                  style={{
                    position: 'fixed',
                    transform: 'translateX(-100%)',
                    zIndex: '100'
                  }}
                >
                  <ArrowBack />
                </Button>
              </Link>
              {this.state.playlist.data && (
                <div className={classes.columnHead}>
                  {this.state.playlist.data.images.length > 0 ? (
                    <img
                      alt='coverImage'
                      className={classes.image}
                      src={this.state.playlist.data.images[0].url}
                    />
                  ) : (
                    <img
                      alt='coverImage'
                      className={classes.image}
                      src={StandardAlbumImage}
                    />
                  )}
                  {this.state.playlist.data && (
                    <Typography variant='h5' style={{ textAlign: 'center' }}>
                      {this.state.playlist.data.name}
                    </Typography>
                  )}
                </div>
              )}

              <List className={classes.listRoot}>
                <ListSubHeader sm={4} style={{ margin: 'auto', width: 300 }}>
                  <Link to='/game/123'>
                    <Button variant='contained' color='primary' fullWidth>
                      Create Game
                    </Button>
                  </Link>
                </ListSubHeader>
                {this.state.playlist.tracks
                  ? this.state.playlist.tracks.items
                    ? this.state.playlist.tracks.items.map(song => {
                        return (
                          <Fragment key={song.track.id}>
                            <ListItem button>
                              <ListItemText primary={song.track.name} />
                            </ListItem>
                            <Divider />
                          </Fragment>
                        );
                      })
                    : null
                  : null}
              </List>
            </Grid>
          )}
        </Grid>
      </>
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
