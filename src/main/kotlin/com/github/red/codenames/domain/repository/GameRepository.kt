package com.github.red.codenames.domain.repository

import com.github.red.codenames.domain.model.GameInstance
import com.github.red.codenames.domain.model.GameState
import org.springframework.stereotype.Repository
import java.util.concurrent.ConcurrentHashMap

@Repository
class GameRepository {
    @Volatile private var gameInstance = GameInstance("singleton_game_id", GameState.LOBBY, null, emptyList(), null)

    fun getGame(id: String): GameInstance? = gameInstance
    fun getGameByBoard(boardId: String): GameInstance? = gameInstance

    fun saveGame(game: GameInstance): GameInstance? {
        this.gameInstance = game
        return game
    }

    fun updateGame(game: GameInstance): GameInstance? {
        this.gameInstance = game
        return game
    }
}
