package com.github.red.codenames.domain.model

data class Card(val leftSide: String, val rightSide: String)

enum class Type {
    PASSERBY, RED, BLUE, ASSASIN;

    companion object {
        fun fromTeam(team: Team): Type = if (team == Team.RED) Type.RED else BLUE
    }

}

enum class GameState {
    LOBBY, IN_GAME, FINISHED
}

data class GameInstance(
    val id: String,
    val state: GameState,
    val boardId: String?,
    val players: List<String>,
    val winner: Team?
)

data class Field(
    val codename: String,
    val type: Type,
    val clicked: Boolean = false
)

data class Board(
    val id: String,
    val fields: List<Field>,
    val guessingTeam: Team,
    val height: Int = 5,
    val width: Int = 5
)
