package com.github.red.codenames.domain.ports

import com.github.red.codenames.domain.model.Board
import com.github.red.codenames.domain.model.Card
import com.github.red.codenames.domain.model.Field
import com.github.red.codenames.domain.model.Team
import com.github.red.codenames.domain.model.Type
import com.github.red.codenames.domain.repository.BoardRepository
import com.github.red.codenames.domain.repository.CardRepository
import org.springframework.stereotype.Service
import java.util.UUID
import kotlin.random.Random

@Service
class BoardService(private val cardRepository: CardRepository,
                   private val boardRepository: BoardRepository) {


    fun getBoard(id: String) = boardRepository.findOne(id)

    fun generateBoard(): Board {
        val cards = cardRepository.getCards(fields)
        val starts = Team.values()[Random.nextInt(2)]
        val fields = cards.mapIndexed { index, card ->
            when {
                index < firstTeam -> Field(selectSide(card), Type.fromTeam(starts))
                index in (firstTeam until firstTeam + secondTeam) -> {
                    Field(selectSide(card), Type.fromTeam(Team.values().first { it != starts }))
                }
                index in (firstTeam + secondTeam until firstTeam + secondTeam + passerby) -> {
                    Field(selectSide(card), Type.PASSERBY)
                }
                else -> Field(selectSide(card), Type.ASSASIN)
            }
        }
        val board = Board(UUID.randomUUID().toString(), fields.shuffled().toMutableList(), starts, height, width)
        return boardRepository.save(board)
    }

    fun clickCard(boardId: String, cardId: Int): BoardClickResult? =
        getBoard(boardId)?.let {
            val card = it.fields[cardId]
            if (card.clicked) BoardClickResult(it, null)
            else {
                val clickedCard = card.copy(clicked = true)
                val nextStarts = when (clickedCard.type) {
                    Type.PASSERBY -> otherTeam(it.guessingTeam)
                    Type.RED -> if (it.guessingTeam == Team.RED) it.guessingTeam else otherTeam(it.guessingTeam)
                    Type.BLUE -> if (it.guessingTeam == Team.BLUE) it.guessingTeam else otherTeam(it.guessingTeam)
                    Type.ASSASIN -> Team.NONE
                }
                val newBoard = it.copy(
                    fields = it.fields.mapIndexed { i, f -> if (i == cardId) clickedCard else f },
                    guessingTeam = nextStarts
                )

                val winner = when (clickedCard.type) {
                    Type.ASSASIN -> otherTeam(it.guessingTeam)
                    Type.PASSERBY -> null
                    Type.RED -> if (allSolved(newBoard, Type.RED)) Team.RED else null
                    Type.BLUE -> if (allSolved(newBoard, Type.BLUE)) Team.BLUE else null
                }

                BoardClickResult(boardRepository.update(newBoard)!!, winner)
            }
        }

    fun endTurn(boardId: String): Board? =
        getBoard(boardId)?.let {
            boardRepository.update(it.copy(guessingTeam = otherTeam(it.guessingTeam)))
        }

    private fun selectSide(card: Card) = if (Random.nextBoolean()) card.rightSide else card.leftSide

    private fun otherTeam(team: Team) =
        if (team == Team.RED) Team.BLUE else Team.RED

    private fun allSolved(board: Board, type: Type) =
        board.fields.filter { it.type == type }.all { it.clicked }

    companion object {
        const val width = 5
        const val height = 5
        const val fields = 25
        const val passerby = 7
        const val assasins = 1
        const val firstTeam = 9
        const val secondTeam = 8
    }
}

data class BoardClickResult(
    val board: Board,
    val winner: Team?
)
