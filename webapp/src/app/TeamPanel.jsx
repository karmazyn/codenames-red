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
import {CardCounter} from "./CardCounter";
import {getNumberOfBlueCards, getNumberOfRedCards} from "./redux/Selectors";

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
        const {red, blue} = this.props
        return (
            <Grid container direction={"column"} xs={12} margin="">
                <Grid item xs={12} className={classes.teamGrid}>
                    <Typography variant={"h4"}><CardCounter teamName={"RED"} getNumberOfCardsFunction={getNumberOfRedCards} /></Typography>
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
                <Grid item xs={12}>
                    <Typography variant={"h4"}><CardCounter teamName={"BLUE"} getNumberOfCardsFunction={getNumberOfBlueCards} /></Typography>
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
