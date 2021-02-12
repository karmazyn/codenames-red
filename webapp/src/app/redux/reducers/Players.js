import {LOAD_PLAYERS, MOVE_PLAYER} from "../ActionTypes";
import Player from "../../Player";
import {Teams} from "../../Player"

const initialState = {
    players: {}
};

function nextTeam(currentTeam, direction) {
    switch (direction) {
        case "left":
            return Teams[currentTeam].left
        case "right":
            return Teams[currentTeam].right
        default:
            return Teams.NONE.name
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

            return {
                players: Object.assign({}, ...players.map(
                    player => ({[player.name]: new Player(player.name, player.team, player.role)})
                    )
                )
            }

        default:
            return state;
    }
}
