import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Container, Image, Segment, Button} from 'semantic-ui-react'
import Typography from '@material-ui/core/Typography';

import {getTrackObject} from "../Actions/track-actions";
import {Link} from "react-router-dom";
import ButtonMUI from "@material-ui/core/Button";

import { withStyles } from '@material-ui/core/styles';



import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
        if (this.props.track.trackObject===null || this.props.track.trackObject===undefined) return (<div>Loading...</div>);
        return (
            <div className={"TrackPage"}>
                <Container textAlign='center' className={"TrackPage"}>

                    <Segment style={{marginTop:"10px"}} raised loading={this.props.track.fetchingTrackObject}>
                        <Typography variant="h5" gutterBottom>
                            {this.props.track.trackObject.name} -
                            <ButtonMUI
                                onClick={()=>{
                                    window.location.replace(this.props.track.trackObject.uri);
                                }}
                                variant="outlined"
                                className={classes.button}>
                                Open this Track on Spotify
                            </ButtonMUI>
                        </Typography>
                    </Segment>

                    <Segment
                        raised
                        loading={this.props.track.fetchingTrackObject}
                        clearing

                    >
                     <Image
                         src={this.props.track.trackObject.album.images[0].url}
                         bordered
                         centered
                         size='medium'

                          />

                    </Segment>



                    <Segment raised loading={this.props.track.fetchingTrackObject}>
                        <Typography variant="subtitle1" gutterBottom>
                            {this.props.track.trackObject.artists.map((artist,i)=>{
                                return (
                                    <Button
                                        as={Link} to={`/artist/${artist.id.toString()}`}
                                        variant={"contained"}
                                        key={i}>
                                        {artist.name.toString()}
                                    </Button>);

                            })}
                        </Typography>
                    </Segment>

                    <Segment raised loading={this.props.track.fetchingTrackObject}>
                        <Typography variant="subtitle1" gutterBottom>
                            Time: {this.props.track.trackObject.duration_ms/60000} munites.
                        </Typography>
                    </Segment>

                    <Segment raised loading={this.props.track.fetchingTrackObject}>

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
                    </Segment>


                </Container>

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