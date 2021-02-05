import { INIT_BOARD, UPDATE_ON_CLICK} from "./ActionTypes";

export const initBoard = ({boardId, fields, starts}) => ({
    type: INIT_BOARD,
    payload: {
        boardId,
        fields,
        starts,
    },
});

export const updateBoardOnClick = ({fields}) => ({
    type: UPDATE_ON_CLICK,
    payload: {fields}
});
