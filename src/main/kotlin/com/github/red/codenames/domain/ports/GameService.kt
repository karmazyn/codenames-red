package com.github.red.codenames.domain.ports

import com.github.red.codenames.domain.model.GameInstance
import com.github.red.codenames.domain.model.GameState
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
                id = "singleton_game_id",
                state = GameState.LOBBY,
                boardId = null,
                players = mutableListOf(playerId),
                winner = null,
            )
        )!!

    fun getGame(gameId: String): GameInstance? =
        gameRepository.getGame(gameId)

    fun startGame(gameId: String): GameInstance? =
        getGame(gameId)?.let {
            if (!listOf(GameState.LOBBY, GameState.FINISHED).contains(it.state))
                throw IllegalStateException()

            synchronized(gameRepository) {
                if (getGame(gameId)!!.boardId === null) {
                    gameRepository.updateGame(
                            it.copy(
                                    state = GameState.IN_GAME,
                                    boardId = boardService.generateBoard().id,
                                    winner = null,
                            )
                    )
                } else {
                    getGame(gameId)
                }
            }
        }

    fun restartGame(gameId: String): GameInstance? =
        getGame(gameId)?.let {
            gameRepository.updateGame(
                it.copy(
                    state = GameState.IN_GAME,
                    boardId = boardService.overwriteBoard().id,
                    winner = null,
                )
            )
        }

    fun backToLobby(gameId: String): GameInstance? =
        getGame(gameId)?.let {
            gameRepository.updateGame(it.copy(
                state = GameState.LOBBY,
                boardId = null,
                winner = null,
            ))
        }

    fun clickOnBoard(boardId: String, cardId: Int): GameInstance? =
        gameRepository.getGameByBoard(boardId)?.let { gameInstance ->
            if (gameInstance.state != GameState.IN_GAME)
                throw IllegalStateException()

            boardService.clickCard(gameInstance.boardId!!, cardId)?.let { clickResult ->
                if (clickResult.winner != null) {
                    gameRepository.updateGame(gameInstance.copy(
                        state = GameState.FINISHED,
                        winner = clickResult.winner,
                    ))
                } else gameInstance
            }
        }

    fun endTurn(gameId: String): GameInstance? =
        gameRepository.getGame(gameId)?.let {
            boardService.endTurn(it.boardId!!)
            it
        }
}
