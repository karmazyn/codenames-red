import React, {Component} from 'react';
import {Typography} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";
import PlayerInfo from "./PlayerInfo";
import {getPlayerName} from "./redux/Selectors";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

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
    render() {
        const {classes} = this.props;
        return (
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Hackatajniacy
                    </Typography>
                    <div style={{flexGrow: 10}}>
                        <Link to="/lobby">Lobby</Link>
                    </div>
                    <PlayerInfo name={this.props.name}/>
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: getPlayerName(state),
    };
}

export default connect(mapStateToProps)(withStyles(useStyles)(DashboardPanel));