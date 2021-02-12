export const getBoardId = store => store.board.boardId;

export const getBoardFields = store => store.board.fields;

export const getStartingPlayer = store => store.board.starts;

export const getNumberOfRedCards = store => store.board.numberOfRed

export const getNumberOfBlueCards = store => store.board.numberOfBlue

export const getPlayers = store => store.players.players;

export const getTeamPlayers = (store, team) => Object.entries(getPlayers(store))
    .map(([name, player]) => player)
    .filter(player => player.team === team)

export const getPlayerName = store => store.playerInfo.name;
