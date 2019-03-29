import React, {Component} from 'react';
import {connect} from "react-redux";

import {getAlbumObject} from "../Actions/album-actions";
import { Container} from "semantic-ui-react";
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';


import Avatar from '@material-ui/core/Avatar';

import ArrowForward from '@material-ui/icons/ArrowForward';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
const styles = theme => ({
    avatar: {
        margin: 1,
    },

    purpleAvatar: {
        color: '#fff',
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
        console.log(this.props);
        const { classes } = this.props;
        if (this.props.album.albumObject===null || this.props.album.albumObject===undefined || this.props.album.fetchingAlbumObject) return (<div><CircularProgress/></div>);
        else return (
            <div style={{padding:"10px"}} className={"Page"}>
                <Container textAlign='center'>

                    <Paper >
                        <Typography variant="h5" gutterBottom>
                            {this.props.album.albumObject.name} -
                            <Button
                                onClick={()=>{
                                    window.location.replace(this.props.album.albumObject.uri);
                                }}
                                variant="outlined"
                                className={classes.button}>
                                Open this Album on Spotify
                            </Button>
                        </Typography>
                    </Paper>

                    <Paper style={{marginTop:"10px"}}
                    >
                        <img
                            src={this.props.album.albumObject.images[0].url}
                            alt={this.props.album.albumObject.name}
                            width={"250"}
                            height={"250"}
                            style={{margin:"5px"}}

                        />

                    </Paper>



                    <Paper style={{marginTop:"10px"}}>
                        <Typography variant="subtitle1" gutterBottom>
                            {this.props.album.albumObject.artists.map((artist,i)=>{
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
                        <Typography variant="subtitle1" gutterBottom style={{padding:"5px"}}>
                            Popularity
                            <LinearProgress variant="determinate" value={this.props.album.albumObject.popularity} title={"Popularity"}/>
                        </Typography>
                    </Paper>

                    <Paper style={{marginTop:"10px"}}>
                        <List component="nav">
                            {this.props.album.albumObject.tracks.items.map((track,i)=>{
                                return (<ListItem/* button*/ key={i} alignItems="flex-start">
                                    <ListItemIcon>
                                        <Avatar className={classes.purpleAvatar} style={{backgroundColor:this.props.settings.palette.primary.main}}>{

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
                    </Paper>


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