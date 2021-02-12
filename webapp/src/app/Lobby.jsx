import React, {Component} from "react";
import TeamChooser from "./TeamChooser";
import {connect} from "react-redux";
import {getBoardFields, getBoardId, getStartingPlayer} from "./redux/Selectors";
import DashboardPanel from "./DashboardPanel";
import {loadPlayers} from "./redux/Actions";

class Lobby extends Component {

    componentDidMount() {
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

    updatePlayersScheduledAsync() {
        let intervalId = setInterval(() => {
            clearInterval(intervalId);
            fetch("/api/players")
                .then(result => result.json())
                .then(result => this.props.loadPlayers({players: result}))
                .then(() => this.updatePlayersScheduledAsync());
        }, 1000);
    }

    render() {
        return (
            <React.Fragment>
                <DashboardPanel/>
                <TeamChooser/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        boardId: getBoardId(state),
        fields: getBoardFields(state),
        starts: getStartingPlayer(state),
    };
}

export default connect(mapStateToProps, {loadPlayers})(Lobby);
