import React, {Component} from "react";
import ReactDOM from 'react-dom';
import '../css/App.css';
import Board from "./Board";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import DashboardPanel from "./DashboardPanel";
import TeamChooser from "./TeamChooser";
import Grid from "@material-ui/core/Grid";
import TeamPanel from "./TeamPanel";

import {connect, Provider} from "react-redux";
import store from "./redux/Store";

import {initBoard, updateBoard} from "./redux/Actions";
import {getBoardId} from "./redux/Selectors";
import { CookiesProvider } from 'react-cookie';

class App extends Component {
    componentDidMount() {
        const url = "/api/boards"
        fetch(url, {
            method: "POST"
        })
            .then((result) => result.json())
            .then((result) => {
                this.props.initBoard({
                    boardId: result.id,
                    fields: result.fields,
                    starts: result.starts,
                })
            })
            .then(() => {
                this.updateBoardStateScheduleAsync()
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
                <Container id="main" className={"App"} maxWidth="md">
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
