import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = {
    root: {
        width: 200,
    },
    slider: {
        padding: '22px 0px',
    },
};

class SimpleSlider extends React.Component {



    render() {
        const { classes,value } = this.props;

        return (
            <div className={classes.root}>

                <Slider
                    classes={{ container: classes.slider }}
                    value={value}
                    aria-labelledby="label"
                    onChange={this.props.handleChange}
                    min={0}
                    max={100}
                    step={1}

                />
            </div>
        );
    }
};


export default withStyles(styles)(SimpleSlider);