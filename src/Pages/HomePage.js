import React, {Component} from 'react';
import Typography from "@material-ui/core//Typography";
import {connect} from "react-redux";


import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SearchIcon from '@material-ui/icons/Search';
import PermIdentity  from '@material-ui/icons/PermIdentity';

import { withStyles } from '@material-ui/core/styles';

import ListItemIcon from '@material-ui/core/ListItemIcon';

import {NavLink} from 'react-router-dom';

const styles = theme => ({
    icon: {
        margin: theme.spacing.unit,
        fontSize: 45,
    },
    toolbarTitle: {
        flex: 1,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },

    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing.unit * 2,
    },
    cardActions: {
        [theme.breakpoints.up('sm')]: {
            paddingBottom: theme.spacing.unit * 2,
        },
    }
});

class HomePage extends Component {


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.auth.token === null || this.props.auth.token === undefined)
            this.props.history.push(`/login`);
    }


    render() {

        const { classes } = this.props;

        const tiers = [
            {
                title: 'Profile',
                icon:<PermIdentity className={classes.icon}/>,
                description: "Go to your profile. There will be a lot of features when I finished this section.",
                buttonText: "Let's Look",
                buttonVariant: 'outlined',
                path:"/profile"
            },
            {
                title: 'Now Playing',
                icon:<PlayArrowIcon className={classes.icon}/>,
                description: "This is Now Playing Page. You can control anything just like Spotify. But, with extra superpowers!",
                buttonText: "Let's Listen",
                buttonVariant: 'contained',
                path:"/np"
            },
            {
                title: 'Search',
                icon:<SearchIcon className={classes.icon}/>,
                description: "Search anything! Tracks, Albums and Artists! Playlists will be added very soon!",
                buttonText: "Let's Search",
                buttonVariant: 'outlined',
                path:"/search"
            },
        ];

        return(
            <div className={"Page"}>
                <main className={classes.layout}>
                <Grid container spacing={40} alignItems="center" justify="center" style={{ minHeight: '90vh' }}>
                    {tiers.map(tier => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={tier.title} xs={12} sm={6} md={4} style={{marginTop:"10px"}}>
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                    className={classes.cardHeader}
                                />
                                <Divider />
                                <CardContent>
                                    <div className={classes.cardPricing}>
                                        <ListItemIcon>{tier.icon}</ListItemIcon>
                                    </div>
                                        <Typography variant="subtitle1" align="center">
                                            {tier.description}
                                        </Typography>
                                </CardContent>
                                <CardActions className={classes.cardActions}>
                                    <Button fullWidth variant={tier.buttonVariant} color="primary">
                                        <NavLink  exact to={tier.path} style={{all:"unset"}}>
                                        {tier.buttonText}
                                        </NavLink>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                </main>

            </div>
        );


    }
}

const mapStateToProps = (state, props) => {
    return {...state,...props};
};


export default connect(mapStateToProps)(withStyles(styles)(HomePage));