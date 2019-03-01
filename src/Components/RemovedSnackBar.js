import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});

let handleClickFn;

class DeletedSnackbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleUndo = props.handleUndo.bind(this);
    }

    state = {
        open: false,
    };

    handleClick(){
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleUndoo = () => {
        this.handleUndo();
        this.handleClose();
    }

    componentDidMount() {
        handleClickFn = this.handleClick;
    }

    render() {
        const { classes } = this.props;
        return (
            <div>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Removed from your library !</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleUndoo}>
                            UNDO
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

//DeletedSnackbar.propTypes = {
//    classes: PropTypes.object.isRequired,
//};
export function openRemovedSnackbar() {
    handleClickFn();
}

export default withStyles(styles)(DeletedSnackbar);