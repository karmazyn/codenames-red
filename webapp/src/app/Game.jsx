import React, {Component} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import DashboardPanel from "./DashboardPanel";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TeamPanel from "./TeamPanel";
import Board from "./Board";
import {getBoardId} from "./redux/Selectors";
import {connect} from "react-redux";
import {initBoard, updateBoard} from "./redux/Actions";

class Game extends Component {
    componentDidMount() {
        this.createNewGame();
    }

    createNewGame() {
        fetch("/api/game", {method: "POST", credentials: "same-origin"})
            .then(response => response.json())
            .then(gameInstance => {
                fetch(`/api/game/${gameInstance.id}/start`, {method: 'POST'})
                    .then(response => response.json())
                    .then(gameInstance => {
                        fetch(`/api/boards/${gameInstance.boardId}`)
                            .then(response => response.json())
                            .then(board => {
                                this.props.initBoard({
                                    boardId: board.id,
                                    fields: board.fields,
                                    guessingTeam: board.guessingTeam,
                                    numberOfRed: board.numberOfRed,
                                    numberOfBlue: board.numberOfBlue
                                });
                            })
                            .then(() => this.updateBoardStateScheduleAsync());
                    })
            });
    }

    updateBoardStateScheduleAsync() {
        let intervalId = setInterval(() => {
            clearInterval(intervalId);
            fetch(`/api/boards/${this.props.boardId}`)
                .then(result => result.json())
                .then(result => this.props.updateBoard(result))
                .then(() => this.updateBoardStateScheduleAsync());
        }, 1000);
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <DashboardPanel/>
                <Container id="main" className={"Board"} maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <TeamPanel/>
                        </Grid>
                        <Grid item xs={10}>
                            <Board/>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        boardId: getBoardId(state),
    };
}

export default connect(mapStateToProps, { initBoard, updateBoard })(Game);