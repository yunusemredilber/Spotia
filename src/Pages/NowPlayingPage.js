import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Track from "../Components/Track";

import Fab from '@material-ui/core/Fab';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import SkipNext from '@material-ui/icons/SkipNext';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import Done from '@material-ui/icons/Done';
import Add from '@material-ui/icons/Add';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

import Tooltip from '@material-ui/core/Tooltip';

import RemovedSnackBar,{openRemovedSnackbar} from "../Components/RemovedSnackBar";
import {setToken} from "../Actions/auth-actions";

import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {setLocalToken} from "../Services/authOperations";


import {getCurrentlyPlaying,
        pausePlayer,
        playPlayer,
        nextPlayer,
        previousPlayer,
        trackContainsInLibrary,
        saveTrackToLibrary,
        removeTrackFromLibrary,
        setSeek} from "../Actions/np-actions";
import {Container, Grid} from "semantic-ui-react";
import SetSoundDialogWrapped from "../Components/SetSoundDialogWrapped";
import ShareDialogWrapped from "../Components/ShareDialogWrapped";
import getNewToken from "../Services/getNewToken";
let removedTrackID="";

const optionsMoore = [
    'Set Volume',
    'Share',
    'Details',
    'Go to album',
    'More Tracks Like that',
];





class NowPlayingPage extends Component {

    state={
        ProgressClass:"secondary",
        anchorEl: null,
        openSetSoundDialog:false,
        openShareDialog: false
    };

    componentDidMount() {
        this.timer = setInterval(()=>{
             this.props.onGetCurrentlyPlaying(this.props.auth.token);
        },1000);

    };

    handleProgressClick = (e) =>{
        let width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        let startPoint= (width - e.target.offsetWidth)/2;
        let result = (e.pageX - startPoint) / e.target.offsetWidth;
        console.log(result);
        let duration = this.props.np.response.item.duration_ms * result;

        if(!(e.pageX<startPoint) && !(e.pageX>startPoint+e.target.offsetWidth))
            this.props.setSeek(this.props.auth.token,parseInt(duration));

    };




    componentWillUnmount() {
        clearInterval(this.timer);
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.np.response.item!==undefined &&
            nextProps.np.response.item!==null){
        if (this.props.np.response.item !== nextProps.np.response.item)
            this.props.onTrackContainsInLibrary(this.props.auth.token,nextProps.np.response.item.id);
        }
    };

    togglePlayer = () => {
        if(this.props.np.response.is_playing)
            this.props.onPausePlayer(this.props.auth.token);
        else
            this.props.onPlayPlayer(this.props.auth.token);
    };

    Next = () => {
        this.props.onNextPlayer(this.props.auth.token);
    };

    Previous = () => {
        this.props.onPreviousPlayer(this.props.auth.token);
    };

    toggleLibraryAdd = () => {

        if(this.props.np.tcl[0]){
            removedTrackID = this.props.np.response.item.id;
            this.props.onRemoveTrackFromLibrary(this.props.auth.token,[this.props.np.response.item.id]);
            openRemovedSnackbar();
        }

        else
            this.props.onSaveTrackToLibrary(this.props.auth.token,[this.props.np.response.item.id]);
    };

    handleUndo = () => {
        this.props.onSaveTrackToLibrary(this.props.auth.token,[removedTrackID]);
    };

    handleClickMoore = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseMoore = () => {
        this.setState({ anchorEl: null });
    };

    handleMooreItemClick = (event, index) => {
        this.setState({ anchorEl: null });
        switch (index) {
            case 0:{
                this.handleOpenSetSoundDialog();
                break;
            }
            case 1:{
                //https://telegram.me/share/url?url=%3CURL%3E&text=%3CTEXT%3E
                //https://telegram.me/share/url?url=<URL>&text=<TEXT>
                    this.handleOpenShareDialog();

                break;
            }

            case 2:{
                this.props.history.push(`/track/${this.props.np.response.item.id}`);
                break;
            }

            case 3:{
                this.props.history.push(`/album/${this.props.np.response.item.album.id}`);
                break;
            }
            default:{
                break;
            }
        }
    };

    handleOpenSetSoundDialog=()=>{
        this.setState({openSetSoundDialog: true });
    };

    handleCloseSetSoundDialog=()=>{
        this.setState({openSetSoundDialog: false });
    };


    handleOpenShareDialog=()=>{
        this.setState({openShareDialog: true });
    };

    handleCloseShareDialog=()=>{
        this.setState({openShareDialog: false });
    };




    render() {

        if (this.props.np.response.error){
            // if token will expired try to fix with refresh token in future

            if (this.props.np.response.error.message === "The access token expired")
            {
                let newToken = getNewToken();
                if (newToken) {
                    newToken.then((nt)=>{
                        if(nt.access_token)
                        {
                            // set our new token
                            console.log(nt.access_token);
                            this.props.setToken(nt.access_token);
                            setLocalToken(nt.access_token);
                            this.props.onGetCurrentlyPlaying(this.props.auth.token);

                        }else return (<Redirect to={`/login/${this.props.np.response.error.message.toString()}`}/>);
                    })
                }

            }


        };

        const OpenSpotifyFirst = () =>{

            return(
                <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
                <Grid.Column>
                    <Button
                        variant="contained"
                        color="primary"
                    onClick={()=>{window.location.replace("spotify:");}}>
                        Open Spotify
                    </Button>

                </Grid.Column>
                </Grid>
            );
        };
        // Time {this.props.np.response.progress_ms/this.props.np.response.item.duration_ms*this.props.np.response.item.duration_ms/60000}





        if (this.props.np.response.item===undefined) return <OpenSpotifyFirst/>;
        return (
            <div className={"NowPlayingPage"}>

                <Container textAlign='center' className={"TrackPage"}>
                    <div style={{marginTop:"10px",marginBottom:"25px"}}>
                        <Track data={this.props.np.response.item}/>
                    </div>

                <Tooltip title={((this.props.np.tcl[0]))?"Remove from library":"Add to library"} placement={"bottom"}>
                <Fab  aria-label="Edit" style={{marginRight:"5px"}} onClick={this.toggleLibraryAdd}>
                    {(this.props.np.tcl[0])?<Done/>:<Add/>}
                </Fab>
                </Tooltip>
                <Fab color="secondary" aria-label="Edit" style={{marginRight:"5px"}} onClick={this.Previous}>
                    <SkipPrevious/>
                </Fab>
                <Fab color="primary" aria-label="Add" onClick={this.togglePlayer}>
                    {(this.props.np.response.is_playing)?<Pause />:<PlayArrow />}
                </Fab>
                <Fab color="secondary" aria-label="Edit"  style={{marginLeft:"5px"}} onClick={this.Next}>
                    <SkipNext/>
                </Fab>
                <Fab  aria-label="Edit"
                      style={{marginLeft:"5px"}}
                      aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleClickMoore}>
                    <MoreHoriz/>
                </Fab>


                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleCloseMoore}
                    >
                        {optionsMoore.map((option, index) => (
                            <MenuItem
                                key={option}
                                onClick={event => this.handleMooreItemClick(event, index)}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>



                <div
                    onMouseEnter={()=>{this.setState({ProgressClass:"primary"})}}
                    onMouseLeave={()=>{this.setState({ProgressClass:"secondary"})}}
                    className={"TrackProgress"}
                    onClick={this.handleProgressClick}>

                <Container style={{paddingBottom:"7px"}}>

                    <LinearProgress
                        color={this.state.ProgressClass}
                        style={{marginTop:"20px"}}
                        variant="determinate"
                        value={this.props.np.response.progress_ms/this.props.np.response.item.duration_ms*100} />


                </Container>

                </div>
                    <SetSoundDialogWrapped
                        open={this.state.openSetSoundDialog}
                        onClose={this.handleCloseSetSoundDialog}
                    />
                    <ShareDialogWrapped
                        open={this.state.openShareDialog}
                        onClose={this.handleCloseShareDialog}
                        link={this.props.np.response.item.external_urls.spotify}
                    />


                <RemovedSnackBar handleUndo={this.handleUndo}/>
                </Container>
            </div>
        );


    }
}


const mapStateToProps = (state, props) => {
    return {...state,...props};
};

const mapDispatchToProps = {
    onGetCurrentlyPlaying:getCurrentlyPlaying,
    onPausePlayer:pausePlayer,
    onPlayPlayer:playPlayer,
    onNextPlayer:nextPlayer,
    onPreviousPlayer:previousPlayer,
    onTrackContainsInLibrary:trackContainsInLibrary,
    onSaveTrackToLibrary:saveTrackToLibrary,
    onRemoveTrackFromLibrary:removeTrackFromLibrary,
    setToken,
    setSeek
};

export default connect(mapStateToProps,mapDispatchToProps)(NowPlayingPage);