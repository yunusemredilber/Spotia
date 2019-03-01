import React, {Component} from 'react';
import { Card, Image,Grid,Progress } from 'semantic-ui-react';
import {Link} from "react-router-dom";

class Track extends Component {

    ClickHandler = () => {
        window.location.replace(this.props.data.uri);
    };

    render() {
        let colors = ["grey","brown","yellow","olive","green"];
        let color;
        if (this.props.data.popularity<20)
            color = colors[0];
        else if (this.props.data.popularity<40)
            color = colors[1];
        else if (this.props.data.popularity<60)
            color = colors[2];
        else if (this.props.data.popularity<80)
            color = colors[3];
        else if (this.props.data.popularity<100)
            color = colors[4];
        return (
                <Grid.Column>
                <Card as={Link} to={`/track/${this.props.data.id}`}>
                    <Image src={this.props.data.album.images[0].url} />
                    <Card.Content>
                        <Card.Header>{this.props.data.name}</Card.Header>
                        <Card.Meta>
                            <span >{this.props.data.artists.map((artist,index)=>{
                                if (index+1===this.props.data.artists.length)
                                    return (artist.name.toString());
                                else
                                    return (artist.name.toString()+", ");
                            })}</span>
                        </Card.Meta>
                        <Card.Description>Release date: {this.props.data.album.release_date}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Progress percent={this.props.data.popularity} size='small' color={color}>
                            Popularity
                        </Progress>
                    </Card.Content>
                </Card>
                </Grid.Column>
        );
    }
}

export default Track;