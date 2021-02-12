package com.github.red.codenames.adapters.api

import com.github.red.codenames.domain.model.Board
import com.github.red.codenames.domain.model.Role.CAPTAIN
import com.github.red.codenames.domain.model.Team
import com.github.red.codenames.domain.model.Type
import com.github.red.codenames.domain.model.Type.*
import com.github.red.codenames.domain.ports.BoardService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CookieValue

@RestController
@RequestMapping("/api/boards")
class BoardController(private val boardService: BoardService) {
    @GetMapping("/{id}")
    fun getBoard(@PathVariable id: String,
                 @CookieValue("role", required = false) role: String?): ResponseBoard? =
            boardService.getBoard(id.toLowerCase())?.let { mapBoardForPlayer(it, CAPTAIN.isRole(role)) }

    @GetMapping
    fun getAllBoards(): List<ResponseBoard> = boardService.listBoards().map { mapBoardForPlayer(it) }

    @PostMapping
    fun createBoard(): ResponseBoard = mapBoardForPlayer(boardService.generateBoard())

    @PostMapping("/clicks", consumes = ["application/json"])
    fun clicks(@RequestBody request: ClickRequest,
               @CookieValue("role", required = false) role: String?): ResponseBoard =
        mapBoardForPlayer(boardService.clickCard(request.boardId, request.cardIndex), CAPTAIN.isRole(role))

    private fun mapBoardForPlayer(board: Board, isCaptain: Boolean = true): ResponseBoard =
        ResponseBoard(
            id = board.id,
            fields = board.fields.map {
                val shouldShowTypes = it.clicked
                ResponseField(
                    codename = if (!shouldShowTypes) it.codename else "",
                    type = if (shouldShowTypes || isCaptain) it.type else null,
                    clicked = it.clicked,
                )
            },
            numberOfRed = board.fields.filter { it.type == RED && !it.clicked }.size,
            numberOfBlue = board.fields.filter { it.type == BLUE && !it.clicked}.size,
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
    val numberOfRed: Int,
    val numberOfBlue: Int,
    val starts: Team,
    val height: Int,
    val width: Int
)
