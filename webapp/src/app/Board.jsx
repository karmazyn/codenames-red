import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CodenameCard from "./CodenameCard";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
    },
    gridListTile: {
        alignItems: 'stretch',
        borderSpacing: 2,
        maxHeight: 80,
        maxWidth: 160
    },
}));

export default function Board() {
    const classes = useStyles()

    const cards = ["karta1", "karta2", "karta3", "karta4", "karta5", "karta6", "karta7",
        "karta8", "karta9", "karta10", "karta11", "karta12", "karta13", "karta14",
        "karta15", "karta16", "karta17", "karta18", "karta19", "karta20", "karta21",
        "karta22", "karta23", "karta24", "karta25"]
    return (
        <GridList className={classes.gridList} spacing={2} cols={5}>
            {cards.map((card, index) => (
                <GridListTile cols={1} rows={1} key={index} className={classes.gridListTile}>
                    <CodenameCard codename={card}/>
                </GridListTile>
            ))}
        </GridList>
    );
}