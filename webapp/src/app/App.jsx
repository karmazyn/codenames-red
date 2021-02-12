import React, {Component} from "react";
import ReactDOM from 'react-dom';
import '../css/App.css';
import Board from "./Board";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import DashboardPanel from "./DashboardPanel";
import Grid from "@material-ui/core/Grid";
import TeamPanel from "./TeamPanel";

import {connect, Provider} from "react-redux";
import store from "./redux/Store";

import {initBoard, updateBoard} from "./redux/Actions";
import {getBoardId} from "./redux/Selectors";
import {CardCounter} from "./CardCounter";
import { CookiesProvider } from 'react-cookie';

class App extends Component {
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
                                    starts: board.starts,
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
                <Container id="main" className={"App"} maxWidth="large">
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <TeamPanel/>
                        </Grid>
                        <Grid item xs={10}>
                            <Board/>
                        </Grid>
                    </Grid>
                </Container>
                {/*<TeamChooser />*/}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        boardId: getBoardId(state),
    };
}

const ConnectedApp = connect(mapStateToProps, { initBoard, updateBoard })(App);

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <ConnectedApp/>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root')
);
