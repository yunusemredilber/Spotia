import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from "react-router-dom";

// Redux Actions
import {getSearch,
        cleanSearch,
        setTemp,
        setOffset,
        setSType,
        clearResponse} from "../Actions/search-actions";
import {setToken} from "../Actions/auth-actions";

// Material UI Imports
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

// Semantic UI Imports
import { Container,Grid} from 'semantic-ui-react';

// Components
import Album from "../Components/Album";
import Artist from "../Components/Artist";
import Track from "../Components/Track";
import getNewToken from "../Services/getNewToken";
import {clearLocalRefreshToken, clearLocalToken, setLocalToken} from "../Services/authOperations";


class SearchPage extends Component {


    handleChange = name => event => {
        this.props.onSetTemp(event.target.value);
        if (!event.target.value.startsWith(" ") && event.target.value!== "")
            this.getData(event.target.value);
    };

    getData =(word)=>{
        this.props.onGetSearch(word,this.props.auth.token,0,this.props.search.sType);
        this.props.onSetOffset(0);
    };

    SubmitHandler = (e) => {
        e.preventDefault();
    };

    getMore = () =>{
        this.props.onGetSearch(this.props.search.temp,this.props.auth.token,this.props.search.offset+21,this.props.search.sType);
        this.props.onSetOffset(this.props.search.offset+21);
    };

    handleChangeDType = (event) => {
        //this.props.onCleanSearch();
        this.props.onSetOffset(0);
        this.props.onSetSType(this.props.search.temp,this.props.auth.token,0,event.target.value);
    };


    render() {

        // *** Auth and token operations ->
        if (this.props.search.response.error && this.props.search.response.error.message.trim()!==""){
            // If token will expired or broken, try to fix with refresh token.

            if (this.props.search.response.error.message === "The access token expired" || this.props.search.response.error.message === "Invalid access token" )
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

                            return (<Redirect to={`/login/${this.props.search.response.error.message.toString()}`}/>);
                        }
                    })
                }else {
                    // If our refresh token is broken we should make our user unauthorized.
                    this.props.setToken(null); // Update our redux store.
                    clearLocalToken(); // Clear our local storage token.
                    clearLocalRefreshToken(); // Clear our local storage refresh token.

                    return (<Redirect to={`/login/${this.props.search.response.error.message.toString()}`}/>);
                }
            }
            else return (<Redirect to={`/login/${this.props.search.response.error.message.toString()}`}/>);
        };
        // <- Auth and token operations ***


        let isResponseExist= !!this.props.search.response.tracks || !!this.props.search.response.albums || !!this.props.search.response.artists;

        const Tracks = () =>
            <Container textAlign='center'>
                <Grid stackable columns={3} centered className={"SearchGrid"} stretched container>
                    {
                        (!isResponseExist) ? <p><br/>Search!</p> :
                            (this.props.search.response.tracks.items.map((data) =>
                                {

                                    return (
                                        <Grid.Column key={data.uri}>
                                            <Track key={data.uri} data={data}/>
                                        </Grid.Column>
                                    );

                                }
                            ))
                    }
                </Grid>
                <br/>
                {(isResponseExist)?
                    <Button variant="outlined" onClick={this.getMore} style={{marginBottom:"5px"}}>
                        More
                    </Button>:<br/>}

            </Container>
        ;


        const Albums = () =>
            <Container textAlign='center'>
                <Grid stackable verticalAlign='middle' columns={3} centered className={"SearchGrid"}>
                    {
                        (!isResponseExist) ? <p><br/>Search!</p> :
                            (this.props.search.response.albums.items.map((data,i) =>
                                {
                                    return (
                                        <Grid.Column key={data.uri}>
                                            <Album key={data.uri} data={data}/>
                                        </Grid.Column>
                                    );}
                            ))
                    }
                </Grid>
                <br/>
                {(isResponseExist)?
                    <Button variant="outlined" onClick={this.getMore} style={{marginBottom:"5px"}}>
                        More
                    </Button>:<br/>}

            </Container>
        ;


        const Artists = () =>
            <Container textAlign='center'>
                <Grid stackable verticalAlign='middle' columns={3} centered className={"SearchGrid"}>
                    {
                        (!isResponseExist) ? <p><br/>Search!</p> :
                            (this.props.search.response.artists.items.map((data,i) =>
                                {
                                    return (
                                        <Grid.Column key={data.uri}>
                                            <Artist key={data.uri} data={data}/>
                                        </Grid.Column>
                                    );}
                            ))
                    }
                </Grid>
                <br/>
                {(isResponseExist)?
                    <Button variant="outlined" onClick={this.getMore} style={{marginBottom:"5px"}}>
                        More
                    </Button>:<br/>}

            </Container>
        ;


        let Selected;
        if (this.props.search.sType==='track')
            Selected = Tracks;
        else if (this.props.search.sType==='album')
            Selected = Albums;
        else if (this.props.search.sType==='artist')
            Selected = Artists;

        const Loading = () =><div><CircularProgress/></div>;

        return (
            <div className={"SearchPage"}>
                <form noValidate autoComplete="off" onSubmit={this.SubmitHandler} style={{marginBottom:"10px"}}>
                <TextField
                    id="standard-name"
                    label="Name"
                    className={'textField'}
                    value={this.props.search.temp}
                    onChange={this.handleChange('temp')}
                    margin="normal"
                />
                    <br/>
                    <FormControl>
                    <Select
                        value={this.props.search.sType}
                        onChange={this.handleChangeDType}
                        inputProps={{
                            name: 'age',
                            id: 'age-simple',
                        }}
                    >
                        <MenuItem value={'track'}>Track</MenuItem>
                        <MenuItem value={'album'}>Album</MenuItem>
                        <MenuItem value={'artist'}>Artist</MenuItem>
                    </Select>
                    </FormControl>
                </form >

                {
                    (Object.getOwnPropertyNames(this.props.search.error).length!==0)?
                        (<p>There was an error</p>):
                        ((this.props.search.fetching)?(<Loading/>):(<Selected/>))
                }

            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {...state,...props};
};

const mapDispatchToProps = {
    onGetSearch:getSearch,
    onCleanSearch:cleanSearch,
    onSetTemp:setTemp,
    onSetOffset:setOffset,
    onSetSType:setSType,
    clearResponse,
    setToken
};

export default connect(mapStateToProps,mapDispatchToProps)(SearchPage);