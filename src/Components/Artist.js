import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

import LinearProgress from '@material-ui/core/LinearProgress';

import Button from '@material-ui/core/Button';

const styles = {
    card: {
        width: 250,
    },
    media: {
        height: 250,
        width:250
    },
};

class Artist extends Component {



    render() {

        const { classes, theme } = this.props;

        return(
            <Card className={classes.card} style={{margin:"auto",display:"auto",marginLeft:"auto",marginRight:"auto"}}>
                <Link to={`/artist/${this.props.data.id}`}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={(this.props.data.images[0])?this.props.data.images[0].url:""/*this can make error in console*/}
                            title={"Open "+this.props.data.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                {this.props.data.name}
                            </Typography>
                            <Typography component="p">
                                {this.props.data.genres.map((genre,i)=>{
                                    if (i==this.props.data.genres.length-1)
                                        return(genre.toString()+".");
                                    return(genre.toString()+" ,");
                                })}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <LinearProgress variant="determinate" value={this.props.data.popularity} title={"Popularity"}/>
                <CardActions style={{margin:"auto",display:"auto",marginLeft:"auto",marginRight:"auto"}}>

                    <Link to={`/artist/${this.props.data.id}`}>
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

export default withStyles(styles, { withTheme: true })(Artist);