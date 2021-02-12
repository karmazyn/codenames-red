import {INIT_BOARD, UPDATE_BOARD, ASSIGN_PLAYER_NAME, MOVE_PLAYER, LOAD_PLAYERS} from "./ActionTypes";

export const initBoard = ({boardId, fields, guessingTeam, numberOfRed, numberOfBlue}) => ({
    type: INIT_BOARD,
    payload: {
        boardId,
        fields,
        guessingTeam,
        numberOfRed,
        numberOfBlue
    },
});

export const updateBoard = ({fields, guessingTeam, numberOfRed, numberOfBlue}) => ({
    type: UPDATE_BOARD,
    payload: {fields, guessingTeam, numberOfRed, numberOfBlue}
});

export const movePlayer = ({playerName, direction}) => ({
    type: MOVE_PLAYER,
    payload: {
        playerName,
        direction
    }
})

export const assignPlayerName = ({name}) => ({
    type: ASSIGN_PLAYER_NAME,
    payload: {
        name
    }
})

export const loadPlayers = ({players}) => ({
    type: LOAD_PLAYERS,
    payload: {
        players
    },
})
