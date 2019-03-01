import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';


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

class CopyToClipboardDialogWrapped extends Component {

    state={
        copySuccess: ''
    };

    copyToClipboard = (e) => {
        this.textArea.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        //e.target.focus();
        this.setState({ copySuccess: 'Copied!' });
    };

    handleClose = () => {
        this.props.onClose();
    };


    render() {
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title" onClose={this.handleClose}>
                    Set Volume
                </DialogTitle>
                <MuiDialogContent style={{textAlign:"center"}}>

                    {this.state.copySuccess}

                    <textarea
                        cols={30}
                        style={{
                            outline:"none",
                            resize:"none",
                            overflow:"auto"
                        }}
                        ref={(textarea) => this.textArea = textarea}
                        defaultValue={this.props.text}
                    />
                    <Button
                        variant="contained"
                        onClick={this.copyToClipboard}>Copy to Clipboard</Button>

                </MuiDialogContent>
            </Dialog>
        );
    }
}

export default CopyToClipboardDialogWrapped;

/*
<textarea
ref={(textarea) => this.textArea = textarea}
value={this.props.text}
/>
*
* */