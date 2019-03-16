import React,{Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import TemporaryDrawer from "./TemporaryDrawer";
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Delete from '@material-ui/icons/Delete';

import {Link} from "react-router-dom";


const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {

        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },


});
class SearchAppBar extends Component{
    state={
        isDrawerOpen:false,
        anchorEl: null,
        notificationsOpen:null,
        fakeNotification:[
            {id:0,type:"test",header:"Test Notification",content:"This feature is still in development."},
            {id:1,type:"system",header:"Welcome to Spotia!",content:"Welcome to Spotia dude!"}
        ]
    };




    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    toggleDrawer = (open) => () => {
        this.setState({
            isDrawerOpen: open,
        });
    };

    handleNotificationsClick = (event) =>{
        this.setState({ notificationsOpen: event.currentTarget });

        //window.alert("This action's development is not completed");
    };
    handleNotificationsClose = () =>{


        this.setState({ notificationsOpen: null });

    };

    render() {
        const { classes } = this.props;
        const { anchorEl,notificationsOpen } = this.state;
        const open = Boolean(anchorEl);
        const nOpen = Boolean(notificationsOpen);
        return (
            <div className={classes.root}>

                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            {"Spotia"}
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            {(this.props.token===null)?<Button color="inherit"><Link to={`/login`} style={{color: "inherit"}}>Login</Link></Button>:(
                                <div>

                                        <IconButton color="inherit" onClick={this.handleNotificationsClick}>

                                            <Badge badgeContent={this.state.fakeNotification.length} color="secondary">
                                                <NotificationsIcon />
                                            </Badge>
                                        </IconButton>
                                    <Menu
                                        id="menu-notificationBar"
                                        anchorEl={notificationsOpen}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={nOpen}
                                        onClose={this.handleNotificationsClose}
                                    >
                                        {
                                            this.state.fakeNotification.map((notification,i)=>{
                                                return(

                                                    <MenuItem onClick={this.handleNotificationsClose} key={i} >

                                                        <ListItemIcon className={classes.icon}>
                                                            <InboxIcon />
                                                        </ListItemIcon>
                                                        <ListItemText classes={{ primary: classes.primary }} inset primary={notification.header} secondary={notification.content}/>
                                                        <ListItemIcon className={classes.icon}>
                                                            <IconButton color="inherit" onClick={()=>{this.setState({fakeNotification:this.state.fakeNotification.filter((n)=>(n.id!==notification.id))})}}>
                                                            <Delete />
                                                            </IconButton>
                                                        </ListItemIcon>

                                                    </MenuItem>


                                                );
                                            })
                                        }


                                    </Menu>


                                    <IconButton
                                        aria-owns={open ? 'menu-appbar' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={()=>{this.handleClose();this.props.logout();}}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            )}

                        </div>
                    </Toolbar>
                </AppBar>
                <TemporaryDrawer
                    isDrawerOpen={this.state.isDrawerOpen}
                    toggleDrawer={this.toggleDrawer}
                    logout={this.props.logout}
                    token={this.props.token}
                />
            </div>
        );
    }
}


export default withStyles(styles)(SearchAppBar);