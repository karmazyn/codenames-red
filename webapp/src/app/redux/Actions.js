import { INIT_BOARD, UPDATE_BOARD, ASSIGN_PLAYER_NAME, MOVE_PLAYER} from "./ActionTypes";

export const initBoard = ({boardId, fields, starts}) => ({
    type: INIT_BOARD,
    payload: {
        boardId,
        fields,
        starts,
    },
});

export const updateBoard = ({fields, starts}) => ({
    type: UPDATE_BOARD,
    payload: {fields, starts}
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
