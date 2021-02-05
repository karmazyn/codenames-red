import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import {IconButton} from "@material-ui/core";
import {ArrowLeftOutlined, ArrowRightOutlined} from "@material-ui/icons";
import Player from './Player';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {getBoardFields, getBoardId, getPlayers, getStartingPlayer} from "./redux/Selectors";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import {movePlayer} from "./redux/Actions";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
    playerItem: {
        textAlign: "center"
    },
    red: {backgroundColor: "#f44336"},
    blue: {backgroundColor: "#3f51b5"},
    unassigned: {}
}));


const TeamChooser = ({players, movePlayer}) => {
    const classes = useStyles();

    const red = Object.values(players).filter(player => player.team === "red");
    const blue = Object.values(players).filter(player => player.team === "blue");
    const unassigned = Object.values(players).filter(player => player.team === "unassigned");

    function handleButtonLeft(playerName) {
        movePlayer({"playerName": playerName,"direction": "left"})
    }

    function handleButtonRight(playerName) {
        movePlayer({"playerName": playerName, "direction": "right"})
    }

    const customList = (items, className) => (
        <Paper classes={classes.paper}>
            <List dense component="div" role="list" className={className}>
                {items.map((player) => {
                    const labelId = `transfer-list-item-${player.name}-label`;

                    return (
                        <ListItem className={classes.playerItem} key={player.name} role="listitem">
                            <IconButton onClick={() => handleButtonLeft(player.name)}>
                                <ArrowLeftOutlined/>
                            </IconButton>
                            <ListItemText id={labelId} primary={`${player.name}`}/>
                            <IconButton onClick={() => handleButtonRight(player.name)}>
                                <ArrowRightOutlined/>
                            </IconButton>
                        </ListItem>
                    );
                })}
                <ListItem/>
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>{customList(red, classes.red)}</Grid>
            <Grid item>{customList(unassigned, classes.unassigned)}</Grid>
            <Grid item>{customList(blue, classes.blue)}</Grid>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        players: getPlayers(state)
    };
}


export default connect(mapStateToProps, {movePlayer})(TeamChooser);


