import React, {Component} from "react";
import ReactDOM from 'react-dom';
import '../css/App.css';
import Board from "./Board";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import DashboardPanel from "./DashboardPanel";

import {Provider} from "react-redux";
import store from "./redux/store";
import { connect } from "react-redux";
import { initBoard } from "./redux/Actions";

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
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <DashboardPanel/>
                <Container id="main" className={"App"} maxWidth="md">
                    <Board/>
                </Container>
            </React.Fragment>
        );
    }
}

const ConnectedApp = connect(null, { initBoard })(App);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp/>
    </Provider>,
    document.getElementById('root')
);
