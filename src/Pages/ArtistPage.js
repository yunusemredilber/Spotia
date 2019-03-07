import React, {Component} from 'react';
import {connect} from "react-redux";

import {getArtistObject} from "../Actions/artist-actions";

import { withStyles } from '@material-ui/core/styles';
import deepPurple from "@material-ui/core/colors/deepPurple";

import { Container} from "semantic-ui-react";
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
    avatar: {
        margin: 1,
    },

    purpleAvatar: {
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


class ArtistPage extends Component {

    componentDidMount() {
        if(this.props.match)
            this.props.getArtistObject(this.props.match.params.artistID,this.props.auth.token);
    }

    render() {
        const { classes } = this.props;
        if (this.props.artist.artistObject===null || this.props.artist.artistObject===undefined || this.props.artist.fetchingArtistObject) return (<CircularProgress/>);
        return (
            <div>
                <Container textAlign='center'>
                    <Paper style={{marginTop:"10px"}}>
                        <Typography variant="h5" gutterBottom>
                            {this.props.artist.artistObject.name} -
                            <Button
                                onClick={()=>{
                                    window.location.replace(this.props.artist.artistObject.uri);
                                }}
                                variant="outlined"
                                className={classes.button}>
                                Open this Artist's page on Spotify
                            </Button>
                        </Typography>
                    </Paper>

                    <Paper style={{marginTop:"10px"}}
                    >
                        <img
                            src={(this.props.artist.artistObject.images[0])?this.props.artist.artistObject.images[0].url:""}
                            alt={this.props.artist.artistObject.name}
                            width={"250"}
                            height={"250"}
                            style={{margin:"5px",borderRadius:"60%"}}

                        />

                    </Paper>

                    <Paper style={{marginTop:"10px"}}>
                        <Typography variant="body1" gutterBottom style={{padding:"5px"}}>
                            {this.props.artist.artistObject.followers.total} followers

                        </Typography>
                    </Paper>

                    {this.props.artist.artistObject.genres.length!==0 && <Paper style={{marginTop:"10px"}}>
                        <Typography variant="body1" gutterBottom style={{padding:"5px"}}>
                            {this.props.artist.artistObject.genres.map((genre,i)=>{
                                if(i+1===this.props.artist.artistObject.genres.length)
                                    return (genre.toString());
                                return(genre.toString()+", ");
                            })}

                        </Typography>
                    </Paper>}

                    <Paper style={{marginTop:"10px"}}>
                        <Typography variant="subtitle1" gutterBottom style={{padding:"5px"}}>
                            Popularity
                            <LinearProgress variant="determinate" value={this.props.artist.artistObject.popularity} title={"Popularity"}/>
                        </Typography>
                    </Paper>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state, ...props) => {
    return {...state,...props};
};

const mapDispatchToProps = {
    getArtistObject
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ArtistPage));