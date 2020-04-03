import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { setPlaylists } from '../../redux/actions/gameActions';
import { setSelectedPlaylist } from '../../redux/actions/gameActions';
import { setPlaylistTracks } from '../../redux/actions/gameActions';

import StandardAlbumImage from '../../util/standard_album_image.png';

const styles = theme => ({
  //...theme.spreadThis,
  root: {
    flexGrow: 1,
    padding: '0 50px'
  },
  paper: {
    //padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary
  },
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    width: '100%',
    objectFit: 'cover'
  },
  content: {
    width: '100%',
    //padding: 25,
    textAlign: 'center'
  }
});

class AlbumList extends Component {
  constructor() {
    super();
    this.state = { toCreateGame: false };
  }

  componentDidMount() {
    this.props.setPlaylists();
  }
  handleSelect = playlist => {
    this.props.setSelectedPlaylist(playlist);
    this.props.setPlaylistTracks(playlist);
    this.setState({ toCreateGame: true });
  };

  render() {
    if (this.state.toCreateGame === true) {
      return <Redirect to='/create-game' />;
    }
    const { playlists } = this.props.game;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {playlists.map(playlist => {
            return (
              playlist.tracks.total > 0 && (
                <Grid key={playlist.id} item sm={3}>
                  <Card className={classes.card}>
                    <CardActionArea onClick={() => this.handleSelect(playlist)}>
                      {playlist.images.length > 0 ? (
                        <img
                          alt='coverImage'
                          className={classes.image}
                          src={playlist.images[0].url}
                        />
                      ) : (
                        <img
                          alt='coverImage'
                          className={classes.image}
                          src={StandardAlbumImage}
                        />
                      )}
                      <CardContent
                        style={{
                          minHeight: 40,
                          padding: 5,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography variant='body2' style={{ color: '#111' }}>
                          <b>{playlist.name}</b>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
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
  setPlaylists,
  setSelectedPlaylist,
  setPlaylistTracks
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(AlbumList));
