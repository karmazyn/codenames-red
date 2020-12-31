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
        val board = Board(UUID.randomUUID().toString(), fields.shuffled(), starts, height, width)
        return boardRepository.save(board)
    }

    fun listBoards(): List<Board> = boardRepository.findAll()

    private fun selectSide(card: Card) = if (Random.nextBoolean()) card.rightSide else card.leftSide

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
