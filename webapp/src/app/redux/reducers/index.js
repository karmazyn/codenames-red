import { combineReducers } from "redux";
import board from "./Board"
import players from "./Players"

export default combineReducers({ board, players });
