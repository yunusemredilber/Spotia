import React, {Component} from 'react';
import {Link} from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';


import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    card: {
        width: 250,
    },
    media: {
        height: 250,
        width:250
    },
};
class Album extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.data.id === nextProps.data.id) return false;
        return true;
    }


    render() {

        const { classes } = this.props;


        return(
            <Card className={classes.card} style={{margin:"auto",display:"auto",marginLeft:"auto",marginRight:"auto"}}>
                <Link to={`/album/${this.props.data.id}`} style={{color: "inherit"}}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={this.props.data.images[0].url}
                            title={"Open "+this.props.data.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                {this.props.data.name}
                            </Typography>
                            <Typography component="p">

                                {this.props.data.artists.map((artist,index)=>{
                                    if (index+1===this.props.data.artists.length)
                                        return (artist.name.toString());
                                    else
                                        return (artist.name.toString()+", ");
                                })}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions style={{margin:"auto",display:"auto",marginLeft:"auto",marginRight:"auto"}}>

                    <Link to={`/album/${this.props.data.id}`}>
                        <Button size="small" color="primary" style={{margin:"auto",display:"auto",marginLeft:"auto",marginRight:"auto"}}>
                            Learn More
                        </Button>
                    </Link>
                    <Button size="small" color="primary" style={{margin:"auto",display:"auto",marginLeft:"auto",marginRight:"auto"}}>
                        Find More
                    </Button>
                </CardActions>

            </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Album);