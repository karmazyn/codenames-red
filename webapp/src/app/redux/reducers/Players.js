import {LOAD_PLAYERS, MOVE_PLAYER} from "../ActionTypes";
import Player from "../../Player";

const initialState = {
    players: {}
};

function nextTeam(currentTeam, direction) {
    //nie oceniajcie mnie :<
    switch (currentTeam) {
        case "red":
            if(direction === "right")
                return "unassigned"
            else if(direction === "left")
                return "blue"
            break;
        case "unassigned":
            if(direction === "left")
                return "red";
            else if (direction === "right")
                return "blue";
            break;
        case "blue":
            if(direction === "left")
                return "unassigned";
            else if (direction === "right")
                return "red";
            break;
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case MOVE_PLAYER:
            let player = state.players[action.payload.playerName]

            let playerToInsert = new Player(player.name, nextTeam(player.team, action.payload.direction))
            return {
                players: {...state.players, [action.payload.playerName]: playerToInsert}
            }

        case LOAD_PLAYERS:
            let players = action.payload.players
            let mapTeam = (team) => {
                return team === "NONE" ? "unassigned" : team.toLowerCase()
            }

            return {
                players: Object.assign({}, ...players.map(
                    player => ({[player.name]: new Player(player.name, mapTeam(player.team), player.role.toLowerCase())})
                    )
                )
            }

        default:
            return state;
    }
}
