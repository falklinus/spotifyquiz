import React, { Component } from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";



const styles = theme => ({


});

class ScoreMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artistName: "",
            songName: "",
            artistSimilarity: 0,
            songSimilarity: 0,
            score: 0,
            totalScore: 0
        };
    }
}




const mapStateToProps = state => ({
    game: state.game
});

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(ScoreMessage));
