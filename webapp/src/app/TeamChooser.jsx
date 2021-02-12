import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import {IconButton, ListSubheader} from "@material-ui/core";
import {ArrowLeftOutlined, ArrowRightOutlined} from "@material-ui/icons";
import {connect} from "react-redux";
import {getPlayers} from "./redux/Selectors";
import {movePlayer} from "./redux/Actions";
import {Teams} from "./Player";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 200,
        height: 500,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
    playerItem: {
        textAlign: "center"
    },
    red: {
        backgroundColor: "#f44336",
        height: 500,
        width: 200
    },
    blue: {
        backgroundColor: "#3f51b5",
        height: 500,
        width: 200
    },
    unassigned: {
        height: 500,
        width: 200
    },
    title: {
        textAlign: "center"
    }
}));


const TeamChooser = ({players, movePlayer}) => {
    const classes = useStyles();

    const red = Object.values(players).filter(player => player.team === Teams.RED.name);
    const blue = Object.values(players).filter(player => player.team === Teams.BLUE.name);
    const none = Object.values(players).filter(player => player.team === Teams.NONE.name);

    function handleButtonLeft(playerName) {
        movePlayer({"playerName": playerName, "direction": "left"})
    }

    function handleButtonRight(playerName) {
        movePlayer({"playerName": playerName, "direction": "right"})
    }

    const customList = (teamName, items, className) => (
        <Paper classes={classes.paper}>
            <ListSubheader className={classes.title}>{teamName}</ListSubheader>
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
            <Grid item>{customList("RED", red, classes.red)}</Grid>
            <Grid item>{customList("NONE", none, classes.unassigned)}</Grid>
            <Grid item>{customList("BLUE", blue, classes.blue)}</Grid>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        players: getPlayers(state)
    };
}


export default connect(mapStateToProps, {movePlayer})(TeamChooser);


