import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import deepPurple from '@material-ui/core/colors/deepPurple';

import CopyToClipboardDialogWrapped from "./CopyToClipboardDialogWrapped";

const types = ['Telegram', 'Spotify URL'];


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
const styles = {
    purpleAvatar: {
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
};

class ShareDialogWrapped extends Component {

    state={
        openCopyToClipboardDialog:false
    };


    handleClose = () => {
        this.props.onClose();
    };

    handleListItemClick = (type) => {
        switch (type) {
            case types[0]:{
                window.open(`https://telegram.me/share/url?url=${this.props.link}&text=${"You should check this track!"}`, "_blank");
                this.handleClose();
                break;
            }

            case types[1]:{
                this.handleOpenCopyToClipboardDialog();
                break;
            }


            default:{
                this.handleClose();
                break;
            }
        }

    };

    handleOpenCopyToClipboardDialog=()=>{
        this.setState({openCopyToClipboardDialog: true });
    };

    handleCloseCopyToClipboardDialog=()=>{
        this.setState({openCopyToClipboardDialog: false });
    };


    render() {
        const { classes } = this.props;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title" onClose={this.handleClose}>
                    Share With
                </DialogTitle>
                <div>
                    <List>
                        {types.map(type => (
                            <ListItem button onClick={() => this.handleListItemClick(type)} key={type}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        {type.charAt(0)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={type} />
                            </ListItem>
                        ))}

                    </List>
                </div>
                <CopyToClipboardDialogWrapped
                    open={this.state.openCopyToClipboardDialog}
                    onClose={this.handleCloseCopyToClipboardDialog}
                    text={this.props.link}

                />
            </Dialog>
        );
    }
}

export default withStyles(styles)(ShareDialogWrapped);