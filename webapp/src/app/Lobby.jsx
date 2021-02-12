import React, {Component} from "react";
import TeamChooser from "./TeamChooser";
import {connect} from "react-redux";
import {getBoardFields, getBoardId, getGuessingTeam} from "./redux/Selectors";
import DashboardPanel from "./DashboardPanel";
import {loadPlayers} from "./redux/Actions";
import PlayerInput from "./PlayerInput";
import CssBaseline from "@material-ui/core/CssBaseline";

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

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <DashboardPanel/>
                <PlayerInput />
                <TeamChooser/>
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

export default connect(mapStateToProps, {loadPlayers})(Lobby);
