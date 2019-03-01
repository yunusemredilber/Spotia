import React, {Component} from 'react';
import Typography from "@material-ui/core//Typography";

import { Visibility } from 'semantic-ui-react';
class HomePage extends Component {

    state = {
        calculations: {
            direction: 'none',
            height: 0,
            width: 0,
            topPassed: false,
            bottomPassed: false,
            pixelsPassed: 0,
            percentagePassed: 0,
            topVisible: false,
            bottomVisible: false,
            fits: false,
            passing: false,
            onScreen: false,
            offScreen: false,
        },
    };


    handleUpdate = (e, { calculations }) => this.setState({ calculations });


    render() {
        return(
            <div>
                <Typography>Home Page</Typography>


                <Visibility onUpdate={this.handleUpdate}>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl pretium fusce id velit ut tortor pretium viverra suspendisse. Euismod lacinia at quis risus. Nibh venenatis cras sed felis eget velit aliquet sagittis id. Elementum pulvinar etiam non quam. Nisi est sit amet facilisis magna. Elit at imperdiet dui accumsan sit amet nulla facilisi. Pharetra pharetra massa massa ultricies. Suscipit tellus mauris a diam maecenas sed enim. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Lorem ipsum dolor sit amet consectetur. Posuere sollicitudin aliquam ultrices sagittis orci a.

                    Dignissim cras tincidunt lobortis feugiat vivamus at. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Urna duis convallis convallis tellus id. Quam viverra orci sagittis eu volutpat. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Tortor condimentum lacinia quis vel eros donec ac odio. Urna porttitor rhoncus dolor purus non enim. Lacus vel facilisis volutpat est velit egestas dui id. Tellus molestie nunc non blandit massa enim nec. Facilisi etiam dignissim diam quis. Id aliquet lectus proin nibh nisl condimentum id venenatis. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Sodales ut etiam sit amet nisl purus.

                    Amet dictum sit amet justo donec enim diam vulputate ut. Leo vel fringilla est ullamcorper eget nulla facilisi. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Nunc sed blandit libero volutpat. Venenatis tellus in metus vulputate. Diam quis enim lobortis scelerisque fermentum. Augue ut lectus arcu bibendum at varius vel pharetra vel. Eget est lorem ipsum dolor sit. Eu lobortis elementum nibh tellus molestie. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Faucibus nisl tincidunt eget nullam non nisi est sit amet. Sollicitudin nibh sit amet commodo. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Non odio euismod lacinia at quis risus sed vulputate. Nulla malesuada pellentesque elit eget gravida cum. Pulvinar mattis nunc sed blandit libero volutpat sed.

                    Iaculis nunc sed augue lacus viverra vitae congue eu. Neque sodales ut etiam sit amet nisl purus. Et tortor consequat id porta nibh. Dis parturient montes nascetur ridiculus mus. Aenean et tortor at risus viverra adipiscing at in tellus. Leo a diam sollicitudin tempor id eu. Elementum sagittis vitae et leo. Cursus mattis molestie a iaculis at erat. Ipsum consequat nisl vel pretium lectus quam. Aliquam eleifend mi in nulla. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Diam vulputate ut pharetra sit amet aliquam id diam maecenas. Netus et malesuada fames ac turpis egestas integer eget. Habitasse platea dictumst vestibulum rhoncus. Consequat semper viverra nam libero justo laoreet sit amet. Euismod elementum nisi quis eleifend quam. Sed id semper risus in hendrerit gravida. Risus in hendrerit gravida rutrum quisque non tellus orci. Eget duis at tellus at urna condimentum mattis pellentesque id.

                    Sapien eget mi proin sed libero enim sed faucibus. Dui accumsan sit amet nulla facilisi morbi. Ultricies tristique nulla aliquet enim tortor at. Sem fringilla ut morbi tincidunt augue interdum. At consectetur lorem donec massa. Lacus vestibulum sed arcu non odio. Elit eget gravida cum sociis natoque penatibus et. Semper eget duis at tellus at. Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut. Eget nunc lobortis mattis aliquam faucibus purus. Ultricies leo integer malesuada nunc vel. Dui vivamus arcu felis bibendum. Turpis tincidunt id aliquet risus feugiat in. Eget mauris pharetra et ultrices neque ornare. Varius quam quisque id diam vel quam elementum pulvinar. Vitae turpis massa sed elementum tempus egestas sed sed. Erat pellentesque adipiscing commodo elit. Pharetra et ultrices neque ornare aenean euismod. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum.

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl pretium fusce id velit ut tortor pretium viverra suspendisse. Euismod lacinia at quis risus. Nibh venenatis cras sed felis eget velit aliquet sagittis id. Elementum pulvinar etiam non quam. Nisi est sit amet facilisis magna. Elit at imperdiet dui accumsan sit amet nulla facilisi. Pharetra pharetra massa massa ultricies. Suscipit tellus mauris a diam maecenas sed enim. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Lorem ipsum dolor sit amet consectetur. Posuere sollicitudin aliquam ultrices sagittis orci a.

                    Dignissim cras tincidunt lobortis feugiat vivamus at. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Urna duis convallis convallis tellus id. Quam viverra orci sagittis eu volutpat. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Tortor condimentum lacinia quis vel eros donec ac odio. Urna porttitor rhoncus dolor purus non enim. Lacus vel facilisis volutpat est velit egestas dui id. Tellus molestie nunc non blandit massa enim nec. Facilisi etiam dignissim diam quis. Id aliquet lectus proin nibh nisl condimentum id venenatis. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Sodales ut etiam sit amet nisl purus.

                    Amet dictum sit amet justo donec enim diam vulputate ut. Leo vel fringilla est ullamcorper eget nulla facilisi. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Nunc sed blandit libero volutpat. Venenatis tellus in metus vulputate. Diam quis enim lobortis scelerisque fermentum. Augue ut lectus arcu bibendum at varius vel pharetra vel. Eget est lorem ipsum dolor sit. Eu lobortis elementum nibh tellus molestie. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Faucibus nisl tincidunt eget nullam non nisi est sit amet. Sollicitudin nibh sit amet commodo. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Non odio euismod lacinia at quis risus sed vulputate. Nulla malesuada pellentesque elit eget gravida cum. Pulvinar mattis nunc sed blandit libero volutpat sed.

                    Iaculis nunc sed augue lacus viverra vitae congue eu. Neque sodales ut etiam sit amet nisl purus. Et tortor consequat id porta nibh. Dis parturient montes nascetur ridiculus mus. Aenean et tortor at risus viverra adipiscing at in tellus. Leo a diam sollicitudin tempor id eu. Elementum sagittis vitae et leo. Cursus mattis molestie a iaculis at erat. Ipsum consequat nisl vel pretium lectus quam. Aliquam eleifend mi in nulla. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Diam vulputate ut pharetra sit amet aliquam id diam maecenas. Netus et malesuada fames ac turpis egestas integer eget. Habitasse platea dictumst vestibulum rhoncus. Consequat semper viverra nam libero justo laoreet sit amet. Euismod elementum nisi quis eleifend quam. Sed id semper risus in hendrerit gravida. Risus in hendrerit gravida rutrum quisque non tellus orci. Eget duis at tellus at urna condimentum mattis pellentesque id.

                    Sapien eget mi proin sed libero enim sed faucibus. Dui accumsan sit amet nulla facilisi morbi. Ultricies tristique nulla aliquet enim tortor at. Sem fringilla ut morbi tincidunt augue interdum. At consectetur lorem donec massa. Lacus vestibulum sed arcu non odio. Elit eget gravida cum sociis natoque penatibus et. Semper eget duis at tellus at. Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut. Eget nunc lobortis mattis aliquam faucibus purus. Ultricies leo integer malesuada nunc vel. Dui vivamus arcu felis bibendum. Turpis tincidunt id aliquet risus feugiat in. Eget mauris pharetra et ultrices neque ornare. Varius quam quisque id diam vel quam elementum pulvinar. Vitae turpis massa sed elementum tempus egestas sed sed. Erat pellentesque adipiscing commodo elit. Pharetra et ultrices neque ornare aenean euismod. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl pretium fusce id velit ut tortor pretium viverra suspendisse. Euismod lacinia at quis risus. Nibh venenatis cras sed felis eget velit aliquet sagittis id. Elementum pulvinar etiam non quam. Nisi est sit amet facilisis magna. Elit at imperdiet dui accumsan sit amet nulla facilisi. Pharetra pharetra massa massa ultricies. Suscipit tellus mauris a diam maecenas sed enim. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Lorem ipsum dolor sit amet consectetur. Posuere sollicitudin aliquam ultrices sagittis orci a.

                    Dignissim cras tincidunt lobortis feugiat vivamus at. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Urna duis convallis convallis tellus id. Quam viverra orci sagittis eu volutpat. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Tortor condimentum lacinia quis vel eros donec ac odio. Urna porttitor rhoncus dolor purus non enim. Lacus vel facilisis volutpat est velit egestas dui id. Tellus molestie nunc non blandit massa enim nec. Facilisi etiam dignissim diam quis. Id aliquet lectus proin nibh nisl condimentum id venenatis. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Sodales ut etiam sit amet nisl purus.

                    Amet dictum sit amet justo donec enim diam vulputate ut. Leo vel fringilla est ullamcorper eget nulla facilisi. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Nunc sed blandit libero volutpat. Venenatis tellus in metus vulputate. Diam quis enim lobortis scelerisque fermentum. Augue ut lectus arcu bibendum at varius vel pharetra vel. Eget est lorem ipsum dolor sit. Eu lobortis elementum nibh tellus molestie. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Faucibus nisl tincidunt eget nullam non nisi est sit amet. Sollicitudin nibh sit amet commodo. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Non odio euismod lacinia at quis risus sed vulputate. Nulla malesuada pellentesque elit eget gravida cum. Pulvinar mattis nunc sed blandit libero volutpat sed.

                    Iaculis nunc sed augue lacus viverra vitae congue eu. Neque sodales ut etiam sit amet nisl purus. Et tortor consequat id porta nibh. Dis parturient montes nascetur ridiculus mus. Aenean et tortor at risus viverra adipiscing at in tellus. Leo a diam sollicitudin tempor id eu. Elementum sagittis vitae et leo. Cursus mattis molestie a iaculis at erat. Ipsum consequat nisl vel pretium lectus quam. Aliquam eleifend mi in nulla. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Diam vulputate ut pharetra sit amet aliquam id diam maecenas. Netus et malesuada fames ac turpis egestas integer eget. Habitasse platea dictumst vestibulum rhoncus. Consequat semper viverra nam libero justo laoreet sit amet. Euismod elementum nisi quis eleifend quam. Sed id semper risus in hendrerit gravida. Risus in hendrerit gravida rutrum quisque non tellus orci. Eget duis at tellus at urna condimentum mattis pellentesque id.

                    Sapien eget mi proin sed libero enim sed faucibus. Dui accumsan sit amet nulla facilisi morbi. Ultricies tristique nulla aliquet enim tortor at. Sem fringilla ut morbi tincidunt augue interdum. At consectetur lorem donec massa. Lacus vestibulum sed arcu non odio. Elit eget gravida cum sociis natoque penatibus et. Semper eget duis at tellus at. Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut. Eget nunc lobortis mattis aliquam faucibus purus. Ultricies leo integer malesuada nunc vel. Dui vivamus arcu felis bibendum. Turpis tincidunt id aliquet risus feugiat in. Eget mauris pharetra et ultrices neque ornare. Varius quam quisque id diam vel quam elementum pulvinar. Vitae turpis massa sed elementum tempus egestas sed sed. Erat pellentesque adipiscing commodo elit. Pharetra et ultrices neque ornare aenean euismod. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum.
                </Typography>
                </Visibility>
                {this.state.calculations.bottomVisible.toString()}
            </div>
        );


    }
}



export default HomePage;