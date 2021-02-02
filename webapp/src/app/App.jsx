import React, {Component} from "react";
import ReactDOM from 'react-dom';
import '../css/App.css';
import Board from "./Board";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import DashboardPanel from "./DashboardPanel";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <DashboardPanel  />
                <Container id="main" className={"App"} maxWidth="md">
                    <Board/>
                </Container>
            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
