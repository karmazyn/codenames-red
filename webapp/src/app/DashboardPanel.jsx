import React, {Component} from 'react';
import {InputAdornment, Typography} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";
import {PlusOne} from "@material-ui/icons";
import Input from "@material-ui/core/Input";

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
    login: {
        margin: theme.spacing(1, 1.5),
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
                    <Input id="input-login" className={classes.login} variant="outlined" placeholder={"Podaj imię"}
                           endAdornment={
                               <InputAdornment position={"end"}>
                                   <PlusOne/>
                               </InputAdornment>
                           }
                    />
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(useStyles)(DashboardPanel);