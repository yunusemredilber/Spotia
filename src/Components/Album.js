import React, {Component} from 'react';
import { Card, Image,Grid,Progress } from 'semantic-ui-react';
import {Link} from "react-router-dom";
class Album extends Component {

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
                <Card as={Link} to={`/album/${this.props.data.id}`}>
                    <Image src={this.props.data.images[0].url} />
                    <Card.Content>
                        <Card.Header>{this.props.data.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{this.props.data.artists.map((artist,index)=> (<div key={index}>{artist.name} </div>) )}</span>
                        </Card.Meta>
                        <Card.Description>Release date: {this.props.data.release_date}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Progress percent={this.props.data.popularity} size={color}>
                            Popularity
                        </Progress>
                    </Card.Content>
                </Card>
            </Grid.Column>
        );
    }
}

export default Album;