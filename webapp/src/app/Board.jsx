import React, {Component} from 'react';
import CodenameCard from "./CodenameCard";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import withStyles from "@material-ui/core/styles/withStyles";
import ListSubheader from "@material-ui/core/ListSubheader";
import {Typography} from "@material-ui/core";
import { connect } from "react-redux";
import { getBoardId, getBoardFields, getGuessingTeam } from "./redux/Selectors"

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        alignItems: "center",
        justifyContent: "center"
    },
    subheader: {
        height: "auto",
        justifyContent: "bottom",
        textAlign: "center"
    },
    gridListTile: {
        alignItems: 'stretch',
        borderSpacing: 2
    },
});

class Board extends Component {
    render() {
        const {classes} = this.props;
        const {boardId, fields, guessingTeam} = this.props

        return (
            <GridList cellHeight={120} className={classes.gridList} spacing={5} cols={5}>
                <GridListTile key="Subheader" className={classes.subheader} cols={5}>
                    <ListSubheader disableGutters disableSticky component="div">
                        <Typography variant={"h3"}>Kto teraz: {guessingTeam}!</Typography>
                        <Typography variant={"overline"}>id#{boardId}</Typography>
                    </ListSubheader>
                </GridListTile>
                {fields.map((card, index) => (
                    <GridListTile cols={1} rows={1} key={index} className={classes.gridListTile}>
                        <CodenameCard codename={card.codename}
                                      cardType={card.type}
                                      index={index}
                                      boardId={boardId}/>
                    </GridListTile>
                ))}
            </GridList>
        );
    }
}

const mapStateToProps = state => {
    return {
        boardId: getBoardId(state),
        fields: getBoardFields(state),
        guessingTeam: getGuessingTeam(state),
    };
}

export default connect(mapStateToProps)(withStyles(useStyles)(Board));
