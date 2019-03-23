import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Redux Actions
import {getCurrentlyPlaying,
        pausePlayer,
        playPlayer,
        nextPlayer,
        previousPlayer,
        trackContainsInLibrary,
        saveTrackToLibrary,
        removeTrackFromLibrary,
        setSeek} from "../Actions/np-actions";
import {setToken} from "../Actions/auth-actions";
import {clearResponse} from "../Actions/np-actions";

// Material UI Imports
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Done from '@material-ui/icons/Done';
import Fab from '@material-ui/core/Fab';
import LinearProgress from '@material-ui/core/LinearProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import SkipNext from '@material-ui/icons/SkipNext';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import Tooltip from '@material-ui/core/Tooltip';

// Components
import RemovedSnackBar,{openRemovedSnackbar} from "../Components/RemovedSnackBar";
import Track from "../Components/Track";
import SetSoundDialogWrapped from "../Components/SetSoundDialogWrapped";
import ShareDialogWrapped from "../Components/ShareDialogWrapped";

// Semantic UI Imports
import {Container, Grid} from "semantic-ui-react";

// Services
import getNewToken from "../Services/getNewToken";
import {setLocalToken,
        clearLocalRefreshToken,
        clearLocalToken} from "../Services/authOperations";

// Global Variables
let removedTrackID="";
const optionsMoore = [
    'Set Volume',
    'Share',
    'Details',
    'Go to album',
    'More Tracks Like that',
];


class NowPlayingPage extends Component {

    constructor(props) {
        super(props);
        this.handleProgressClick = this.handleProgressClick.bind(this);
        this.togglePlayer = this.togglePlayer.bind(this);
        this.Next = this.Next.bind(this);
        this.Previous = this.Previous.bind(this);
        this.toggleLibraryAdd = this.toggleLibraryAdd.bind(this);
        this.handleUndo = this.handleUndo.bind(this);
        this.handleClickMoore = this.handleClickMoore.bind(this);
        this.handleCloseMoore = this.handleCloseMoore.bind(this);
        this.handleMooreItemClick = this.handleMooreItemClick.bind(this);
        this.handleOpenSetSoundDialog = this.handleOpenSetSoundDialog.bind(this);
        this.handleCloseSetSoundDialog = this.handleCloseSetSoundDialog.bind(this);
        this.handleOpenShareDialog = this.handleOpenShareDialog.bind(this);
        this.handleCloseShareDialog = this.handleCloseShareDialog.bind(this);
        this.openSpotify = this.openSpotify.bind(this);
    };


    state={
        ProgressClass:"secondary",
        anchorEl: null,
        openSetSoundDialog:false,
        openShareDialog: false
    };

    componentDidMount() {
        this.timer = setInterval(()=>{ // Check track status every second.
             this.props.onGetCurrentlyPlaying(this.props.auth.token);
        },1000);

    };



    handleProgressClick(e){
        // Calculate clicked track position responsively.
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
        // If current playing track changes, check TrackContainsInLibrary.
        if(nextProps.np.response.item!==undefined &&
            nextProps.np.response.item!==null){
        if (this.props.np.response.item !== nextProps.np.response.item)
            this.props.onTrackContainsInLibrary(this.props.auth.token,nextProps.np.response.item.id);
        }
    };

    togglePlayer(){
        if(this.props.np.response.is_playing)
            this.props.onPausePlayer(this.props.auth.token);
        else
            this.props.onPlayPlayer(this.props.auth.token);
    };

    Next(){
        this.props.onNextPlayer(this.props.auth.token);
    };

    Previous(){
        this.props.onPreviousPlayer(this.props.auth.token);
    };

    toggleLibraryAdd(){

        if(this.props.np.tcl[0]){
            removedTrackID = this.props.np.response.item.id;
            this.props.onRemoveTrackFromLibrary(this.props.auth.token,[this.props.np.response.item.id]);
            openRemovedSnackbar();
        }

        else
            this.props.onSaveTrackToLibrary(this.props.auth.token,[this.props.np.response.item.id]);
    };

    handleUndo(){
        this.props.onSaveTrackToLibrary(this.props.auth.token,[removedTrackID]);
    };

    handleClickMoore(event){
        this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseMoore(){
        this.setState({ anchorEl: null });
    };

    handleMooreItemClick(event, index){
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

    handleOpenSetSoundDialog(){
        this.setState({openSetSoundDialog: true });
    };

    handleCloseSetSoundDialog(){
        this.setState({openSetSoundDialog: false });
    };


    handleOpenShareDialog(){
        this.setState({openShareDialog: true });
    };

    handleCloseShareDialog(){
        this.setState({openShareDialog: false });
    };

    openSpotify(){
        window.location.replace("spotify:");
    };




    render() {
            if (this.props.np.error.message) return (<Redirect to={`/login/${this.props.np.error.message.toString()}`}/>);

            // *** Auth and token operations ->
        if (this.props.np.response.error && this.props.np.response.error.message.trim()!==""){
            // If token will expired or broken, try to fix with refresh token.

            if (this.props.np.response.error.message === "The access token expired" || this.props.np.response.error.message === "Invalid access token")
            {
                let newToken = getNewToken(); // Fetching refresh token.
                if (newToken) {
                    this.props.clearResponse(); // Clear response for staying away from here after.
                    newToken.then((nt)=>{
                        if(nt.access_token) // Try to check if there is new refresh token in future.< >
                        {
                            // set our new token
                            this.props.setToken(nt.access_token); // Update our redux store.
                            setLocalToken(nt.access_token); // Update local storage.
                            return (<CircularProgress />);

                            // If there will be any error we should redirect to login page.
                        }else {
                            // If our refresh token is broken we should make our user unauthorized.
                            this.props.setToken(null); // Update our redux store.
                            clearLocalToken(); // Clear our local storage token.
                            clearLocalRefreshToken(); // Clear our local storage refresh token.

                            return (<Redirect to={`/login/${this.props.np.response.error.message.toString()}`}/>);
                        }
                    })
                }else {
                    // If our refresh token is broken we should make our user unauthorized.
                    this.props.setToken(null); // Update our redux store.
                    clearLocalToken(); // Clear our local storage token.
                    clearLocalRefreshToken(); // Clear our local storage refresh token.

                    return (<Redirect to={`/login/${this.props.np.response.error.message.toString()}`}/>);
                }
            }
            else return (<Redirect to={`/login/${this.props.np.response.error.message.toString()}`}/>);
        };
        // <- Auth and token operations ***

        const OpenSpotifyFirst = () =>{
                // Open Spotify screen if there is none current playing track.
            const styleGrid = { height: '90vh' };
            return(
                <Grid textAlign='center' style={styleGrid} verticalAlign='middle'>
                <Grid.Column>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.openSpotify}>
                        Open Spotify
                    </Button>

                </Grid.Column>
                </Grid>
            );
        };
        // Time {this.props.np.response.progress_ms/this.props.np.response.item.duration_ms*this.props.np.response.item.duration_ms/60000}





        if (this.props.np.response.item===undefined) return <OpenSpotifyFirst/>;
        const styleTrack = {marginTop:"10px",marginBottom:"25px"};
        const styleFabR = {marginRight:"5px"};
        const styleFabL = {marginLeft:"5px"};
        const styleContainer = {paddingBottom:"7px"};
        const styleLinearProgress = {marginTop:"20px"};
        return (
            <div className={"NowPlayingPage"}>

                <Container textAlign='center' className={"TrackPage"}>
                    <div style={styleTrack}>
                        <Track data={this.props.np.response.item}/>
                    </div>

                <Tooltip title={((this.props.np.tcl[0]))?"Remove from library":"Add to library"} placement={"bottom"}>
                <Fab  aria-label="Edit" style={styleFabR} onClick={this.toggleLibraryAdd}>
                    {(this.props.np.tcl[0])?<Done/>:<Add/>}
                </Fab>
                </Tooltip>
                <Fab color="secondary" aria-label="Edit" style={styleFabR} onClick={this.Previous}>
                    <SkipPrevious/>
                </Fab>
                <Fab color="primary" aria-label="Add" onClick={this.togglePlayer}>
                    {(this.props.np.response.is_playing)?<Pause />:<PlayArrow />}
                </Fab>
                <Fab color="secondary" aria-label="Edit"  style={styleFabL} onClick={this.Next}>
                    <SkipNext/>
                </Fab>
                <Fab aria-label="Edit"
                      style={styleFabL}
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

                <Container style={styleContainer}>

                    <LinearProgress
                        color={this.state.ProgressClass}
                        style={styleLinearProgress}
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
    setSeek,
    clearResponse
};

export default connect(mapStateToProps,mapDispatchToProps)(NowPlayingPage);