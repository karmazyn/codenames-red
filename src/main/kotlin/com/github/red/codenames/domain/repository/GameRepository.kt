package com.github.red.codenames.domain.repository

import com.github.red.codenames.domain.model.GameInstance
import org.springframework.stereotype.Repository
import java.util.concurrent.ConcurrentHashMap

@Repository
class GameRepository {
    private val games = ConcurrentHashMap<String, GameInstance>()

    fun listGames(): List<GameInstance> = games.values.toList()

    fun getGame(id: String): GameInstance? = games[id]

    fun getGameByBoard(boardId: String): GameInstance? =
        games.values.first { it.boardId == boardId }

    fun saveGame(game: GameInstance): GameInstance? {
        val wasAdded = games.putIfAbsent(game.id, game) == null
        return if (wasAdded) game else null
    }

    fun updateGame(game: GameInstance): GameInstance? =
        if (games.containsKey(game.id))
            games.put(game.id, game)?.let { game }
        else null
}
