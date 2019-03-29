import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Container} from 'semantic-ui-react'
import Typography from '@material-ui/core/Typography';

import {getTrackObject} from "../Actions/track-actions";

import Button from "@material-ui/core/Button";

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import Palette from "react-palette";


let root = document.documentElement;
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        flexBasis: '66.66%',
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    paper: {
        /*backgroundColor: "transparent",*/

    },
});

class TrackPage extends Component {

    state={
      imageWH:250
    };


    componentDidMount() {
        if (this.props.match)
            this.props.getTrackObject(this.props.match.params.id,this.props.auth.token);

    }

    toggleImage = () =>{
        let width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        let r = (this.state.imageWH===width/2)?250:width/2;
        if (width/2<250){
            if (this.state.imageWH===300) r = 250; else r = 300;
            this.setState({imageWH:r});
        }
        this.setState({imageWH:r});
    };

    render() {

        const {classes} = this.props;

        // id : {this.props.match.params.id}
        if (this.props.track.trackObject===null || this.props.track.trackObject===undefined || this.props.track.fetchingTrackObject) return (<CircularProgress className={classes.progress} />);
        const imageUrl = this.props.track.trackObject.album.images[0].url;
        return (
            <div
                className={"Page"}
                 style={{padding:"10px",}}
            >
                <Container textAlign='center'>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" gutterBottom>
                            {this.props.track.trackObject.name} -
                            <Button
                                onClick={()=>{
                                    window.location.replace(this.props.track.trackObject.uri);
                                }}
                                variant="outlined"
                                className={classes.button}>
                                Open this Track on Spotify
                            </Button>
                        </Typography>
                    </Paper>

                    <Paper style={{marginTop:"10px"}} className={classes.paper}>

                    <Palette image={imageUrl}>
                        {palette=>{
                        root.style.setProperty('--color-1', palette.vibrant);
                            root.style.setProperty('--color-2', palette.muted);
                            root.style.setProperty('--color-3', palette.lightVibrant);
                            root.style.setProperty('--color-4', palette.lightMuted);
                            root.style.setProperty('--color-5', palette.darkVibrant);
                            root.style.setProperty('--color-6', palette.darkMuted);

                            return (<div></div>)
                        }}
                    </Palette>
                     <img
                         src={imageUrl}
                         alt={this.props.track.trackObject.name}
                         width={this.state.imageWH}
                         height={this.state.imageWH}
                         style={{margin:"5px"}}
                         onClick={this.toggleImage}
                          />

                    </Paper>



                    <Paper style={{marginTop:"10px"}} className={classes.paper}>
                        <Typography variant="subtitle1" gutterBottom>
                            {this.props.track.trackObject.artists.map((artist,i)=>{
                                return (
                                    <Button
                                        onClick={()=>{
                                            this.props.history.push(`/artist/${artist.id.toString()}`);
                                        }}
                                         style={{margin:"auto",display:"auto",marginLeft:"auto",marginRight:"auto"}}
                                        key={i}>
                                        {artist.name.toString()}
                                    </Button>);

                            })}
                        </Typography>
                    </Paper>

                    <Paper style={{marginTop:"10px"}} className={classes.paper}>
                        <Typography variant="subtitle1" gutterBottom>
                            Time: {parseInt(this.props.track.trackObject.duration_ms/60000)} munites {parseInt(this.props.track.trackObject.duration_ms%60000/1000)} seconds.
                        </Typography>
                    </Paper>

                    <Paper style={{marginTop:"10px"}} className={classes.paper}>
                        <Typography variant="subtitle1" gutterBottom style={{padding:"5px"}}>
                            Popularity
                            <LinearProgress variant="determinate" value={this.props.track.trackObject.popularity} title={"Popularity"}/>
                        </Typography>
                    </Paper>



                    <Paper style={{marginTop:"10px"}} className={classes.paper}>

                            <ExpansionPanel className={classes.paper}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading}>Details</Typography>
                                    <Typography className={classes.secondaryHeading}>Popualarity etc...</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        yo
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                    </Paper>
                </Container >
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {...state,...props};
};

const mapDispatchToProps = {
    getTrackObject
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TrackPage));