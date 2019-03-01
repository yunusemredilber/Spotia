import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import SimpleSlider from "./SimpleSlider";

import { connect } from 'react-redux';

import {getCurrentlyPlayingContext,setVolume} from "../Actions/np-actions";


const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class SetSoundDialogWrapped extends Component {

    constructor(props) {
        super(props);
        this.props.getCurrentlyPlayingContext(this.props.auth.token);
    };

    state={
        volume: (this.props.np.currentlyPlayingContext)?this.props.np.currentlyPlayingContext.device.volume_percent : 50
    };

/*
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.np.currentlyPlayingContext && !nextProps.np.fetching) {
            if (nextProps.np.currentlyPlayingContext.device.volume_percent !==nextState.volume)
                this.setState({volume:nextProps.np.currentlyPlayingContext.device.volume_percent});
        }

    };*/

    handleClose = () => {
        this.props.onClose();
    };



    handleChange = (event, value) => {
        this.setState({volume:value});
        this.props.setVolume(this.props.auth.token,value);
        this.props.getCurrentlyPlayingContext(this.props.auth.token);
    };


    render() {
        if (!this.props.np.currentlyPlayingContext) return (<div></div>);
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title" onClose={this.handleClose}>
                    Set Volume
                </DialogTitle>
                <MuiDialogContent style={{overflow:"hidden"}}>
                    <div >
                        <SimpleSlider
                            handleChange={this.handleChange}
                            value={this.state.volume}/>
                            You need to 'Slide' to it's work
                    </div>
                </MuiDialogContent>
            </Dialog>
        );
    }
};

const mapStateToProps = (state, props) => {
    return {...state,...props};
};

const mapDispatchToProps = {
    getCurrentlyPlayingContext,
    setVolume
};

export default connect(mapStateToProps,mapDispatchToProps)(SetSoundDialogWrapped);





/*KALIPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
*
import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';


const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class SetSoundDialogWrapped extends Component {

    handleClose = () => {
        this.props.onClose();
    };


    render() {
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title" onClose={this.handleClose}>
                    Set Volume
                </DialogTitle>
                <MuiDialogContent>
                    <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                        scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                    </Typography>
                </MuiDialogContent>
            </Dialog>
        );
    }
}

export default SetSoundDialogWrapped;
* */