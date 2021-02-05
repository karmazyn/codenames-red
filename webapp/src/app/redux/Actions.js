import {INIT_BOARD, UPDATE_BOARD} from "./ActionTypes";

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
