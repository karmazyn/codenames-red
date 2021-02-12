package com.github.red.codenames.domain.repository

import com.github.red.codenames.domain.model.Board
import org.springframework.stereotype.Repository

@Repository
class BoardRepository {

    private val boards = mutableMapOf<String, Board>()

    fun findOne(id: String): Board? = boards[id]
    fun save(board: Board): Board =
            boards.putIfAbsent(board.id, board) ?: board

    fun findAll(): List<Board> = boards.values.toList()

    fun update(board: Board): Board? =
        boards.computeIfPresent(board.id) { _, _ -> board }
}
