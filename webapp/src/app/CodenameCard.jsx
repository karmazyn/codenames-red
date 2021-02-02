import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent";
import {Box, CardActionArea} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = (theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#f1e6d3"
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
    render() {
        const {classes} = this.props;

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
                            <Typography align={"center"} className={classes.codename}
                                        variant={"h6"}>{this.props.codename}</Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>)
    }
}

export default withStyles(useStyles)(CodenameCard)