import React, {Component} from "react";
import TeamChooser from "./TeamChooser";
import {connect} from "react-redux";
import {getBoardFields, getBoardId, getGuessingTeam} from "./redux/Selectors";
import DashboardPanel from "./DashboardPanel";
import {loadPlayers} from "./redux/Actions";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {withRouter} from 'react-router';
import PlayerInput from "./PlayerInput";

class Lobby extends Component {
    componentDidMount() {
        this.refreshIntervalId = null;

        const url = "/api/players"
        fetch(url, {
            method: "GET"
        })
            .then((result) => result.json())
            .then((result) => {
                this.props.loadPlayers({
                    players: result
                })
            }).then(() => this.updatePlayersScheduledAsync())
            // .then(() => this.isGameStartedAsync())
    }

    componentWillUnmount() {
        if (this.refreshIntervalId) {
            clearInterval(this.refreshIntervalId);
        }
    }

    updatePlayersScheduledAsync() {
        this.refreshIntervalId = setInterval(() => {
            clearInterval(this.refreshIntervalId);
            fetch("/api/players")
                .then(result => result.json())
                .then(result => this.props.loadPlayers({players: result}))
                .then(() => this.updatePlayersScheduledAsync());
        }, 1000);
    }

    isGameStartedAsync() {
        let intervalId = setInterval(() => {
            clearInterval(intervalId);
            fetch("/api/game/singleton_game_id")
                .then(result => result.json())
                .then(result => {
                    console.log(result);
                    if (result.state === "IN_GAME") {
                        this.props.history.push("/game");
                    } else {
                        this.isGameStartedAsync()
                    }
                })
        }, 1000)
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <DashboardPanel/>
                <PlayerInput />
                <TeamChooser/>
                <div style={{textAlign: "center"}}>
                    <Link to="/game">
                        <Button>Go to or Create new game</Button>
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        boardId: getBoardId(state),
        fields: getBoardFields(state),
        starts: getGuessingTeam(state),
    };
}

export default connect(mapStateToProps, {loadPlayers})(withRouter(Lobby));
