import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { Container,Grid} from 'semantic-ui-react';

import Track from "../Components/Track";
import { connect } from 'react-redux';
import {getSearch,cleanSearch,setTemp,setOffset,setSType} from "../Actions/search-actions";
import Album from "../Components/Album";
import Artist from "../Components/Artist";
import {Redirect} from "react-router-dom";

import CircularProgress from '@material-ui/core/CircularProgress';

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
        if (this.props.search.response.error)
            return (<Redirect to={`/login/${this.props.search.response.error.message.toString()}`}/>);

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
                    <Button variant="outlined" onClick={this.getMore}>
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
                    <Button variant="outlined" onClick={this.getMore}>
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
                    <Button variant="outlined" onClick={this.getMore}>
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
    onSetSType:setSType
};

export default connect(mapStateToProps,mapDispatchToProps)(SearchPage);