import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});
let message="";
let handleClickFn;
let autoHideDuration=3000;

class SimpleSnackbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

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


    componentDidMount() {
        handleClickFn = this.handleClick;
    }

    render() {
        const { classes } = this.props;
        return (
            <div>

                <Snackbar variant="info"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={autoHideDuration}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{message}</span>}
                    action={[

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
};

export function openSnackbar(messagee,duradion_ms) {
    message=messagee;
    autoHideDuration=duradion_ms;
    handleClickFn();
}

export default withStyles(styles)(SimpleSnackbar);