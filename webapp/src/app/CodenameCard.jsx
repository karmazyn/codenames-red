import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent";
import {Box, CardActionArea} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import {updateBoard} from "./redux/Actions";
import { connect } from "react-redux";
import passerby from "../images/passerby.png"
import red from "../images/red.png"
import blue from "../images/blue.png"
import assassin from "../images/assassin.png"
import background from "../images/codenames-bg.jpg"

const useStyles = (theme) => ({
    card_DEFAULT: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#f1e6d3",
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontcolor: "#ffffff"
    },
    card_PASSERBY: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#cbcbcb",
        backgroundImage: `url(${passerby})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    },
    card_RED: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#de2c3d",
        backgroundImage: `url(${red})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontcolor: "#ffffff"
    },
    card_BLUE: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#3d96cf",
        backgroundImage: `url(${blue})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontcolor: "#ffffff"
    },
    card_ASSASIN: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#474441",
        backgroundImage: `url(${assassin})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontcolor: "#ffffff"
    },
    actionArea: {
        display: "flex",
        height: "100%"
    },
    transparentActionArea: {
        display: "flex",
        height: "100%",
        background: "rgba(255,255,255,0.5)"
    },
    content: {
        flexGrow: 1,
        padding: 14,
        alignItems: "stretch"
    },
    codename: {
        color: '#000000',
        letterSpacing: '2px',
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    cardBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
        textAlign: "center",
    }
});

class CodenameCard extends Component {

    handleClick(index, boardId) {
        const data = {
            cardIndex: index
        }
        fetch(`/api/boards/${boardId}/click`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((result) => result.json())
            .then((result) => {
                this.props.updateBoardOnClick({
                    fields: result.board.fields,
                    numberOfRed: result.board.numberOfRed,
                    numberOfBlue: result.board.numberOfBlue,
                    guessingTeam: result.board.guessingTeam,
                })
            })
    }

    render() {
        const {classes} = this.props;

        return (
            <Card className={classes[`card_${this.props.cardType || "DEFAULT"}`]}
                  onClick={() => this.handleClick(this.props.index, this.props.boardId)}
                  variant={"outlined"}>
                <CardActionArea className={classes[`${this.props.clicked ? "actionArea" : "transparentActionArea"}`]}>
                    <CardContent className={classes.content}>
                        <Box className={classes.cardBox}>
                            <Typography align={"center"} className={classes.codename}
                                        variant={"h6"}>{this.props.codename}</Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>)
    }
}

export default connect(null, { updateBoardOnClick: updateBoard })(withStyles(useStyles)(CodenameCard));

