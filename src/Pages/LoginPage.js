import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import "../App.css";
import SimpleSnackbar , {openSnackbar} from "../Components/SnackBar";
import {setToken} from "../Actions/auth-actions";
import { connect } from 'react-redux';
import {clearLocalToken} from "../Services/authOperations";
import {Container,Grid} from "semantic-ui-react";

import {BACKEND_BASE} from "../confing/env";

class LoginPage extends Component {

    componentDidMount() {
        if (this.props.match.params.message){
            openSnackbar(this.props.match.params.message,10000);
            this.props.setToken(null);
            clearLocalToken();
        }

    };


    render() {


        return (
            <div >

                <Container textAlign='center'>
                    <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
                        <Grid.Column>
                <Button variant="outlined" color="primary"
                onClick={() => {
                    this.props.history.push(`/`);
                    window.location.replace(BACKEND_BASE+"login")}}
                >
                    <p>Login with Spotify</p>

                </Button>

                            {(this.props.match.params.message)?(
                                <SimpleSnackbar/>
                            ):""}

                        </Grid.Column>
                    </Grid>
                </Container>

            </div>

        );
    }
}

const mapStateToProps = (state, props) => {
    return {...state,...props};
};

const mapDispatchToProps = {
    setToken
};
export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);