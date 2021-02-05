import { combineReducers } from "redux";
import board from "./Board"
import players from "./Players"
import playerInfo from "./PlayerInfo"

export default combineReducers({ board, players, playerInfo });
