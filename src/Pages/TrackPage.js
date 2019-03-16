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
});

class TrackPage extends Component {




    componentDidMount() {
        if (this.props.match)
            this.props.getTrackObject(this.props.match.params.id,this.props.auth.token);
    }

    render() {
        const {classes} = this.props;

        // id : {this.props.match.params.id}
        if (this.props.track.trackObject===null || this.props.track.trackObject===undefined || this.props.track.fetchingTrackObject) return (<CircularProgress className={classes.progress} />);

        return (
            <div
                className={"TrackPage"}
            >
                <Container textAlign='center' className={"TrackPage"}>

                    <Paper style={{marginTop:"10px"}}>
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

                    <Paper style={{marginTop:"10px"}}>
                     <img
                         src={this.props.track.trackObject.album.images[0].url}
                         alt={this.props.track.trackObject.name}
                         width={"250"}
                         height={"250"}
                         style={{margin:"5px"}}
                          />

                    </Paper>



                    <Paper style={{marginTop:"10px"}}>
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

                    <Paper style={{marginTop:"10px"}}>
                        <Typography variant="subtitle1" gutterBottom>
                            Time: {parseInt(this.props.track.trackObject.duration_ms/60000)} munites {parseInt(this.props.track.trackObject.duration_ms%60000/1000)} seconds.
                        </Typography>
                    </Paper>

                    <Paper style={{marginTop:"10px"}}>

                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading}>Details</Typography>
                                    <Typography className={classes.secondaryHeading}>Popualarity etc...</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                        sit amet blandit leo lobortis eget.
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