import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IndeterminateCheckBox from '@material-ui/icons/IndeterminateCheckBox';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import PermIdentity  from '@material-ui/icons/PermIdentity';
import Settings from '@material-ui/icons/Settings';
import {NavLink} from 'react-router-dom';


const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class TemporaryDrawer extends React.Component {

    state = {
        darkMode: false
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    Change = () =>{
        this.setState({ darkMode: !this.state.darkMode});
    };

    render() {

        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>

                    <NavLink className={"unactivePage"} activeClassName="activePage" exact to="/">
                        <ListItem button key={'Home'}>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary={'Home'} />
                        </ListItem>
                    </NavLink>

                    <NavLink className={"unactivePage"}  activeClassName="activePage" exact to="/np">
                        <ListItem button key={'Now Playing'}>
                            <ListItemIcon><PlayArrowIcon /></ListItemIcon>
                            <ListItemText primary={'Now Playing'} />
                        </ListItem>
                    </NavLink>

                    <NavLink className={"unactivePage"}  activeClassName="activePage" exact to="/search">
                        <ListItem button key={'Search'}>
                            <ListItemIcon><SearchIcon /></ListItemIcon>
                            <ListItemText primary={'Search'} />
                        </ListItem>
                    </NavLink>

                </List>
                <Divider />
                <List>
                    {(this.props.token===null)?(
                        <NavLink className={"unactivePage"}  activeClassName="activePage" exact to="/login">
                            <ListItem button key={'Login'}>
                                <ListItemIcon><PermIdentity /></ListItemIcon>
                                <ListItemText primary={'Login'} />
                            </ListItem>
                            </NavLink>
                    ):(
                        <div onClick={this.props.logout}>
                            <ListItem button key={'Logout'}>
                                <ListItemIcon><IndeterminateCheckBox /></ListItemIcon>
                                <ListItemText primary={'Logout'} />
                            </ListItem>
                        </div>
                    )}

                    <NavLink className={"unactivePage"}  activeClassName="activePage" exact to="/settings">
                        <ListItem button key={'Settings'}>
                            <ListItemIcon><Settings /></ListItemIcon>
                            <ListItemText primary={'Settings'} />
                        </ListItem>
                    </NavLink>


                        <ListItem button key={'d190324'}>

                            <ListItemText primary={'Version'} secondary={"d190324"}/>
                        </ListItem>


                </List>
            </div>
        );

        return (
            <div>

                <SwipeableDrawer open={this.props.isDrawerOpen} onClose={this.props.toggleDrawer(false)} onOpen={this.props.toggleDrawer(true)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.props.toggleDrawer(false)}
                        onKeyDown={this.props.toggleDrawer(false)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}


export default withStyles(styles)(TemporaryDrawer);