import React, {Component} from 'react';
import { Card, Image,Grid,Progress } from 'semantic-ui-react';
class Artist extends Component {

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

        let userIcon = "https://www.animuspilates.hu/_files/velemenyek/profil_image.png";
        return (
            <Grid.Column>
                <Card onClick={this.ClickHandler}>
                    <Image src={(this.props.data.images[0])?this.props.data.images[0].url:userIcon}/>
                    <Card.Content>
                        <Card.Header>{this.props.data.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{this.props.data.followers.total}</span>
                        </Card.Meta>
                        <Card.Description>{this.props.data.genres.map((genre,index)=> (<div key={index}>{genre} </div>) )}</Card.Description>
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

export default Artist;