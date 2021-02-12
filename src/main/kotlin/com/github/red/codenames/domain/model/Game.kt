package com.github.red.codenames.domain.model

data class Card(val leftSide: String, val rightSide: String)

enum class Type {
    PASSERBY, RED, BLUE, ASSASIN;

    companion object {
        fun fromTeam(team: Team): Type = if (team == Team.RED) Type.RED else BLUE
    }

}

enum class GameState {
    LOBBY, IN_GAME
}

data class GameInstance(
    val id: String,
    val state: GameState,
    val boardId: String?,
    val players: MutableList<String>
)

data class Field(
    val codename: String,
    val type: Type,
    val clicked: Boolean = false
)

data class Board(
    val id: String,
    val fields: MutableList<Field>,
    val starts: Team,
    val height: Int = 5,
    val width: Int = 5
)
