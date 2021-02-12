package com.github.red.codenames.domain.ports

import com.github.red.codenames.domain.model.Board
import com.github.red.codenames.domain.model.Card
import com.github.red.codenames.domain.model.Team
import com.github.red.codenames.domain.model.Type
import com.github.red.codenames.domain.repository.BoardRepository
import com.github.red.codenames.domain.repository.CardRepository
import spock.lang.Specification

class BoardServiceSpec extends Specification {

    def cardRepository = Mock(CardRepository)
    def boardRepository = Mock(BoardRepository)
    def boardService = new BoardService(cardRepository, boardRepository)

    def "should generate 5x5 board"() {
        given:
        def cards = (1..25).toList().collect { new Card("LCard#$it", "RCard$it") }
        cardRepository.getCards(25) >> cards
        boardRepository.save(_) >> {args -> args[0]}

        when:
        def board = boardService.generateBoard()

        then:
        board.fields.size() == 25
        board.fields*.codename.unique().size() == 25
        numberOfCards(board, Type.ASSASIN) == 1

        assert ((numberOfCards(board, Type.RED) == 9 && numberOfCards(board, Type.BLUE) == 8)
                || (numberOfCards(board, Type.RED) == 8 && numberOfCards(board, Type.BLUE) == 9))

        assert ((board.guessingTeam == Team.RED && numberOfCards(board, Type.RED) == 9) ||
                (board.guessingTeam == Team.BLUE && numberOfCards(board, Type.BLUE) == 9))
    }

    private static int numberOfCards(Board board, Type type) {
        board.fields*.type.findAll { it == type }.size()
    }
}
