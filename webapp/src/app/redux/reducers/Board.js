import {INIT_BOARD, UPDATE_BOARD} from "../ActionTypes";

const initialState = {
    boardId: "N/A",
    fields: [],
    guessingTeam: "",
    numberOfBlue: null,
    numberOfRed: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case INIT_BOARD: {
            return {
                boardId: action.payload.boardId,
                fields: action.payload.fields,
                guessingTeam: action.payload.guessingTeam,
                numberOfRed: action.payload.numberOfRed,
                numberOfBlue: action.payload.numberOfBlue
            };
        }

        case UPDATE_BOARD: {
            return {
                ...state,
                numberOfRed: action.payload.numberOfRed,
                numberOfBlue: action.payload.numberOfBlue,
                fields: action.payload.fields,
                guessingTeam: action.payload.guessingTeam,
            };
        }

        default:
            return state;
    }
}
