import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent";
import {Box, CardActionArea} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import {updateBoardOnClick} from "./redux/Actions";
import { connect } from "react-redux";

const useStyles = (theme) => ({
    card_DEFAULT: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#f1e6d3"
    },
    card_PASSERBY: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#cbcbcb"
    },
    card_RED: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#de2c3d"
    },
    card_BLUE: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#3d96cf"
    },
    card_ASSASIN: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#474441"
    },
    media: {
        paddingTop: '56.25%', // 16:9
        height: '0',
        flexGrow: 1
    },
    actionArea: {
        display: "flex",
        height: "100%",
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
        textAlign: "center",
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
            boardId: boardId,
            cardIndex: index
        }
        fetch("/api/boards/clicks", {
            method: "POST",
            body: JSON.stringify(data)
        })
            .then((result) => result.json())
            .then((result) => {
                this.props.updateBoardOnClick({
                    fields: result.fields
                })
            })
    }

    render() {
        const {classes} = this.props;

        return (
            <Card className={classes[`card_${this.props.cardType || "DEFAULT"}`]}
                  onClick={() => this.handleClick(this.props.index, this.props.boardId)}
                  variant={"outlined"}>
                <CardActionArea className={classes.actionArea}>
                    {/*<CardMedia*/}
                    {/*    className={classes.media}*/}
                    {/*    component={"img"}*/}
                    {/*    alt={props.codename}*/}
                    {/*    image={cardBackground}*/}
                    {/*    title={props.codename}*/}
                    {/*/>*/}
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

export default connect(null, { updateBoardOnClick })(withStyles(useStyles)(CodenameCard));

