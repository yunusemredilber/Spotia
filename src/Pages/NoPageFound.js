import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Container,Grid} from "semantic-ui-react";

class NoPageFound extends Component {
    render() {
        return (
            <div>
                <Container textAlign='center'>
                    <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
                        <Grid.Column>
                    <Typography style={{margin:"auto"}}
                                gutterBottom
                                variant="h5"
                                component="h2"
                    >
                        {"No Page Found!"}
                    </Typography>
                            <br/>
                            <Button variant="outlined" color="primary"
                                    onClick={() => {
                                        this.props.history.push(`/`);
                                        }}
                            >
                                <p>Go to home</p>

                            </Button>
                        </Grid.Column>
                    </Grid>
                </Container>

            </div>
        );
    }
}

export default NoPageFound;