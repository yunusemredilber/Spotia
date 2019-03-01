import React, {Component} from 'react';
import {connect} from "react-redux";

import {getAlbumObject} from "../Actions/album-actions";
import {Button, Container, Image, Segment} from "semantic-ui-react";
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';

import ButtonMUI from '@material-ui/core/Button';


import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';

import ArrowForward from '@material-ui/icons/ArrowForward';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Fab from '@material-ui/core/Fab';

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


class AlbumPage extends Component {



    componentDidMount() {
        if(this.props.match)
            this.props.getAlbumObject(this.props.match.params.albumID,this.props.auth.token);
    }

    render() {
        const { classes } = this.props;
        if (this.props.album.albumObject===null || this.props.album.albumObject===undefined) return (<div>Loading</div>);
        else return (
            <div>
                <Container textAlign='center'>

                    <Segment style={{marginTop:"10px"}} raised clearing loading={this.props.album.fetchingAlbumObject}>
                        <Typography variant="h5" gutterBottom>
                            {this.props.album.albumObject.name} -
                            <ButtonMUI
                                onClick={()=>{
                                    window.location.replace(this.props.album.albumObject.uri);
                                }}
                                variant="outlined"
                                className={classes.button}>
                                Open this Album on Spotify
                            </ButtonMUI>
                        </Typography>
                    </Segment>

                    <Segment
                        raised
                        loading={this.props.album.fetchingAlbumObject}
                        clearing

                    >
                        <Image
                            src={this.props.album.albumObject.images[0].url}
                            bordered
                            centered
                            size='medium'

                        />

                    </Segment>



                    <Segment raised loading={this.props.album.fetchingAlbumObject}>
                        <Typography variant="subtitle1" gutterBottom>
                            {this.props.album.albumObject.artists.map((artist,i)=>{
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

                    <Segment raised loading={this.props.album.fetchingAlbumObject}>
                        <List component="nav">
                            {this.props.album.albumObject.tracks.items.map((track,i)=>{
                                return (<ListItem/* button*/ key={i} alignItems="flex-start">
                                    <ListItemIcon>
                                        <Avatar className={classes.purpleAvatar}>{
                                            track.name.charAt(0).toLocaleUpperCase()+track.name.charAt(1).toUpperCase()
                                        }</Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={track.name} secondary={track.artists.map((artist,i)=>{
                                        if(i===track.artists.length-1)return(artist.name.toString());
                                            return(artist.name.toString()+", ");
                                        })} />
                                    <ListItemSecondaryAction>
                                        <Fab onClick={()=>{
                                            this.props.history.push(`/track/${track.id}`);
                                        }} aria-label="Add">
                                        <ArrowForward/>
                                        </Fab>
                                    </ListItemSecondaryAction>
                                </ListItem>);
                            })}
                        </List>
                    </Segment>



                </Container>
            </div>
        );
    }
};

const mapStateToProps = (state, ...props) => {
    return {...state,...props};
};

const mapDispatchToProps = {
    getAlbumObject
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AlbumPage));