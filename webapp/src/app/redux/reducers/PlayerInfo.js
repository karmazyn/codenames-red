import {ASSIGN_PLAYER_NAME} from "../ActionTypes";

const initialState = {
    name: "ANON",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ASSIGN_PLAYER_NAME: {
            return {
                name: action.payload.name,
            };
        }

        default:
            return state;
    }
}
