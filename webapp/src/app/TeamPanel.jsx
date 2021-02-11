import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Mood} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import {getBoardFields, getBoardId, getStartingPlayer} from "./redux/Selectors";
import connect from "react-redux/lib/connect/connect";
import {loadPlayers} from "./redux/Actions";

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    }
});

class TeamPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: []
        }
    }

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
            })
    }

    render() {
        const {classes} = this.props;
        const {players} = this.props
        return (
            <List component="nav" aria-label="teams">
                {/*{ players.map((player) => (*/}
                {/*selected={player.role === 'CAPTAIN'}*/}
                <ListItem>
                    <ListItemIcon>
                        <Mood/>
                    </ListItemIcon>
                    <ListItemText primary="hello"/>

                </ListItem>
                {/*))}*/}
            </List>
        );
    }
}

/*data class Player(val name: String, val team: Team?, val role: Role)

enum class Team {
    RED, BLUE, NONE
}

enum class Role {
    CAPTAIN, GUESSER, SPECTATOR
}*/
const mapStateToProps = state => {
    return {
        boardId: getBoardId(state),
        fields: getBoardFields(state),
        starts: getStartingPlayer(state),
    };
}

export default connect(mapStateToProps, {loadPlayers})(withStyles(useStyles)(TeamPanel));
