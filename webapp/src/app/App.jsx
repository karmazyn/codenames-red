import React, {Component} from "react";
import ReactDOM from 'react-dom';
import '../css/App.css';

import {Provider} from "react-redux";
import store from "./redux/Store";

import { CookiesProvider } from 'react-cookie';
import { HashRouter , Route, Switch} from 'react-router-dom';
import Lobby from "./Lobby";
import Game from "./Game";

class App extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path="/" component={Game} exact/>
                    <Route path="/lobby" component={Lobby}/>
                    <Route component={Error}/>
                </Switch>
            </main>
        );
    }
}


ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root')
);
