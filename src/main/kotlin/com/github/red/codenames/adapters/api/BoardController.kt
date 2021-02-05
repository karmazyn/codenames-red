package com.github.red.codenames.adapters.api

import com.github.red.codenames.domain.model.Board
import com.github.red.codenames.domain.model.Team
import com.github.red.codenames.domain.model.Type
import com.github.red.codenames.domain.ports.BoardService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/boards")
class BoardController(private val boardService: BoardService) {
    @GetMapping("/{id}")
    fun getBoard(@PathVariable id: String): ResponseBoard? =
         boardService.getBoard(id.toLowerCase())?.let { mapBoardForPlayer(it) }

    @GetMapping
    fun getAllBoards(): List<ResponseBoard> = boardService.listBoards().map { mapBoardForPlayer(it) }

    @PostMapping
    fun createBoard(): ResponseBoard = mapBoardForPlayer(boardService.generateBoard())

    @PostMapping("/clicks", consumes = ["application/json"])
    fun clicks(@RequestBody request: ClickRequest): ResponseBoard =
        mapBoardForPlayer(boardService.clickCard(request.boardId, request.cardIndex))

    private fun mapBoardForPlayer(board: Board, isCapitan: Boolean = true): ResponseBoard =
        ResponseBoard(
            id = board.id,
            fields = board.fields.map {
                val shouldShowTypes = it.clicked
                ResponseField(
                    codename = if (!shouldShowTypes) it.codename else "",
                    type = if (shouldShowTypes || isCapitan) it.type else null,
                    clicked = it.clicked,
                )
            },
            starts = board.starts,
            height = board.height,
            width = board.width,
        )
}

data class ClickRequest(
    val boardId: String,
    val cardIndex: Int
)

data class ResponseField(
    val codename: String,
    val type: Type?,
    val clicked: Boolean
)

data class ResponseBoard(
    val id: String,
    val fields: List<ResponseField>,
    val starts: Team,
    val height: Int,
    val width: Int
)
