import React, {Component, useEffect} from 'react';
import {InputAdornment, Typography} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";
import PlayerInput from "./PlayerInput";
import { useCookies, withCookies } from 'react-cookie';
import PlayerInfo from "./PlayerInfo";

const useStyles = theme => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    iconButton: {
        padding: 10,
    },
});

class DashboardPanel extends Component {

    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            name: cookies.get('name') || "ANON",
            team: "NIEZNANY",
            role: "NIEZNANA"
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Hackatajniacy
                    </Typography>
                    <PlayerInfo name={this.state.name} team={this.state.team} role={this.state.role} />
                    <PlayerInput />
                </Toolbar>
            </AppBar>
        );
    }
}

export default withCookies(withStyles(useStyles)(DashboardPanel));