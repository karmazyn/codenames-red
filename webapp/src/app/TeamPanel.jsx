import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Mood} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import {getTeamPlayers} from "./redux/Selectors";
import {loadPlayers} from "./redux/Actions";
import {connect} from "react-redux";
import {Divider, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = theme => ({
    teamGrid: {
        marginBottom: "5em"
    }
});

class TeamPanel extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const url = "/api/players"
        fetch(url, {
            method: "GET"
        })
            .then((result) => result.json())
            .then((result) => {
                this.props.loadPlayers({
                    players: result
                })
            })
    }

    render() {
        const {classes} = this.props;
        const {red, blue, unassigned} = this.props
        return (
            <Grid container direction={"column"} xs={12} margin="">
                <Grid item xs={12} className={classes.teamGrid}>
                    <Typography variant={"h4"}>RED</Typography>
                    <Divider/>
                    <List component="nav" aria-label="teams">
                        {red.map(player => (
                            <ListItem selected={player.role === 'captain'}>
                                <ListItemIcon>
                                    <Mood/>
                                </ListItemIcon>
                                <ListItemText>
                                    {player.name}
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} className={classes.teamGrid}>
                    <Typography variant={"h4"}>BLUE</Typography>
                    <Divider/>
                    <List component="nav" aria-label="teams">
                        {blue.map( player => (
                            <ListItem selected={player.role === 'captain'}>
                                <ListItemIcon>
                                    <Mood/>
                                </ListItemIcon>
                                <ListItemText>
                                    {player.name}
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} className={classes.teamGrid}>
                    <Typography variant={"h4"}>SPECTATORS</Typography>
                    <Divider/>
                    <List component="nav" aria-label="teams">
                        {unassigned.map( player => (
                            <ListItem>
                                <ListItemIcon>
                                    <Mood/>
                                </ListItemIcon>
                                <ListItemText>
                                    {player.name}
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        red: getTeamPlayers(state, "red"),
        blue: getTeamPlayers(state, "blue"),
        unassigned: getTeamPlayers(state, "unassigned")
    };
}

export default connect(mapStateToProps, {loadPlayers})(withStyles(useStyles)(TeamPanel));
