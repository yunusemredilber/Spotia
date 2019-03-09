import React, { Component } from 'react';
import './App.css';
import AppBar from "./Components/AppBar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import HomePage from "./Pages/HomePage";
import NoPageFound from "./Pages/NoPageFound";
import NowPlayingPage from "./Pages/NowPlayingPage";
import SearchPage from "./Pages/SearchPage";
import LoginPage from "./Pages/LoginPage";
import TrackPage from "./Pages/TrackPage";
import ArtistPage from "./Pages/ArtistPage";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import {getLocalToken,setLocalToken} from "./Services/authOperations";


import {setToken} from "./Actions/auth-actions";

import { connect } from 'react-redux';
import {getTrackObject} from "./Actions/track-actions";
import AlbumPage from "./Pages/AlbumPage";

import {BACKEND_BASE} from "./confing/env";
import Callback from "./Pages/Callback";
import {CssBaseline} from "@material-ui/core";

import SettingsPage from "./Pages/SettingsPage";
import {setSettings} from "./Actions/settings-actions";

import {getLocalSettings,setLocalSettings} from "./Services/settingsOperations";





class App extends Component {
  constructor(props){
    super(props);/*
        if (this.props.auth.token === null) 
        {
            if (getLocalToken()!==undefined)
                this.props.onSetToken(getLocalToken());
            else{
                const params = this.getHashParams();
                let token = params.access_token;
                if (token!==undefined) {
                    this.props.onSetToken(token);
                    setLocalToken(token);
                    console.log(getLocalToken());
                }

                else
                {
                    this.props.onSetToken(null);
                    window.location.replace("http://localhost:8888");
                }

            }
        }*/
      // First look there is a new token came as parameter
      const params = this.getHashParams();
      let token = params.access_token;
      if (token!==undefined) {
          this.props.onSetToken(token);
          setLocalToken(token);
          console.log(getLocalToken());
      }
      // If there is not a new token then check local storage
      else if (getLocalToken()!==undefined){

          // I should check the token is working or not
          this.props.onSetToken(getLocalToken());

      }
      // Even there is no token then redirect to login page
      else {
          this.props.onSetToken(null);
          window.location.replace(BACKEND_BASE);
      }

      // Settings init
      let settings = getLocalSettings();
        if (settings===null || settings===undefined)
        {
            setLocalSettings(this.props.settings);
        }
        else {
            this.props.setSettings(settings);
        }
          
  }

    getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }
/*
  componentDidMount(){
  let url = new URL('https://api.spotify.com/v1/search');
  let params = {q:"y3d", type:"album,track,artist"}
  url.search = new URLSearchParams(params);
  fetch(url, {
    method: "GET",
    headers: {
    Authorization: `Bearer ${this.state.token}`     
  }
  })
  .then(response => response.json())
  .then(r=>console.log(r))
  }
*/

    Logout = () => {
        this.props.onSetToken(null);
        this.props.onSetToken(null);
        window.open("http://spotify.com/logout/", "_blank","width=400,height=600");

    };

 
  render() {
      console.log(this.props);
      const theme = createMuiTheme(this.props.settings);
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
            <Router>
      <div className="App">


          <AppBar logout={this.Logout} className={"AppBar"} token={this.props.auth.token} />
          <Switch>

              <Route path={"/"} exact /*strict*/ component={HomePage}/>
              <Route path={"/np"} exact /*strict*/ component={NowPlayingPage} />
              <Route path={"/search"} exact /*strict*/ component={SearchPage}/>

              <Route path={"/login/:message"} exact /*strict*/ component={LoginPage}/>
              <Route path={"/login"} exact /*strict*/ component={LoginPage}/>

              <Route exact path='/track/:id' component={TrackPage}></Route>
              <Route exact path='/album/:albumID' component={AlbumPage}></Route>
              <Route exact path='/artist/:artistID' component={ArtistPage}></Route>
              <Route exact path='/callback/' component={Callback}></Route>

              <Route path={"/settings"} exact /*strict*/ component={SettingsPage}/>

              <Route exact /*strict*/ component={NoPageFound}/>
          </Switch>
      </div>
            </Router>
            </MuiThemeProvider>

    );
  }

}
const mapStateToProps = (state, props) => {
    return {...state,...props};
};

const mapDispatchToProps = {
    onSetToken:setToken,
    getTrackObject,
    setSettings
};
export default connect(mapStateToProps,mapDispatchToProps)(App);

// /callback/?code=AQBJ2wKm8_iQxWkSDtjFeBjUsy1ACuJ-q8sN9DXjh8O8T1RdC25SjJJs9Iri5ddXIZbX87770hDbWHfcVKdlmlBdUpHj_9rBhfV7pnJo2bOD41cn74CH4Rg2WsYAlo2TMpEmQCaYphyPgC6xTvSyDQGNJb1GmKbLxhQtc1JtI3j_fhuXh8SfK1C7EPraIWg46IjSXWUgl4IV0sf4o1gwr5UTRXpl7tJkVrR0xpD2oUOA2EJrCEaEb33p1jxuJRiG2I1PPoucLdoVPbm8ozorrJm6JHJ2I5UDxOD3vT8r52m4EdQjMyQucfpBTFKz0SnWpylT-DjiHCJmKp-c_QLro-1XD9wsAkEI-dZE92VD7JQWfUAXrG8A8aNY94ZL8HQlMstr027LJozf0-ebEcg_7M7Mw2a9wp2GTTMUliZtezi63ZlTs5Os6fHpd3g5gnep0FrXUAIA0BK_-_tbs8lVoUAqfjE8Rmr0&state=bUWKqsneyJV6w4JZ
