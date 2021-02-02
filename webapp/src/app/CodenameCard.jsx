import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CardContent from "@material-ui/core/CardContent";
import {Box, CardActionArea} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import cardBackground from "../images/codenames-bg.jpg"
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
}));

export default function CodenameCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card} variant={"outlined"}>
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
                        <Typography align={"center"} className={classes.codename} variant={"h6"}>{props.codename}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>)
}