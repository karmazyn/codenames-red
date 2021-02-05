import { INIT_BOARD} from "./ActionTypes";

export const initBoard = ({boardId, fields, starts}) => ({
    type: INIT_BOARD,
    payload: {
        boardId,
        fields,
        starts,
    },
});
