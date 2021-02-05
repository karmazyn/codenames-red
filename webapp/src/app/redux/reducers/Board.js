import {INIT_BOARD, UPDATE_BOARD} from "../ActionTypes";

const initialState = {
    boardId: "N/A",
    fields: [],
    starts: "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case INIT_BOARD: {
            return {
                boardId: action.payload.boardId,
                fields: action.payload.fields,
                starts: action.payload.starts,
            };
        }

        case UPDATE_BOARD: {
            return {
                ...state,
                fields: action.payload.fields
            };
        }

        default:
            return state;
    }
}
