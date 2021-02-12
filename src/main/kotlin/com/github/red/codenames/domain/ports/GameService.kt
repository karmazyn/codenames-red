package com.github.red.codenames.domain.ports

import com.github.red.codenames.domain.model.GameInstance
import com.github.red.codenames.domain.model.GameState
import com.github.red.codenames.domain.repository.BoardRepository
import com.github.red.codenames.domain.repository.GameRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class GameService(
    private val gameRepository: GameRepository,
    private val boardService: BoardService
) {
    fun createGame(playerId: String): GameInstance =
        gameRepository.saveGame(
            GameInstance(
                id = UUID.randomUUID().toString(),
                state = GameState.LOBBY,
                boardId = null,
                players = mutableListOf(playerId)
            )
        )!!

    fun getGame(gameId: String): GameInstance? =
        gameRepository.getGame(gameId)

    fun startGame(gameId: String): GameInstance? =
        getGame(gameId)?.let {
            if (it.state != GameState.LOBBY)
                throw IllegalStateException()

            gameRepository.updateGame(
                it.copy(
                    state = GameState.IN_GAME,
                    boardId = boardService.generateBoard().id,
                )
            )
        }
}
