package com.github.red.codenames.adapters.api

import com.github.red.codenames.domain.model.Board
import com.github.red.codenames.domain.model.GameInstance
import com.github.red.codenames.domain.model.Role.CAPTAIN
import com.github.red.codenames.domain.model.Team
import com.github.red.codenames.domain.model.Type
import com.github.red.codenames.domain.model.Type.BLUE
import com.github.red.codenames.domain.model.Type.RED
import com.github.red.codenames.domain.ports.BoardService
import com.github.red.codenames.domain.ports.GameService
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/boards")
class BoardController(private val boardService: BoardService,
                      private val gameService: GameService) {
    @GetMapping("/{id}")
    fun getBoard(@PathVariable id: String,
                 @CookieValue("role", required = false) role: String?): BoardResponse? =
            boardService.getBoard(id.toLowerCase())?.let { mapBoardForPlayer(it, CAPTAIN.isRole(role)) }

    @PostMapping("/{id}/click", consumes = ["application/json"])
    fun click(@RequestBody request: ClickRequest,
              @PathVariable id: String,
              @CookieValue("role", required = false) role: String?): BoardClickResponse? =
        gameService.clickOnBoard(id, request.cardIndex)?.let {
            BoardClickResponse(
                mapBoardForPlayer(boardService.getBoard(it.boardId!!)!!, CAPTAIN.isRole(role)),
                it
            )
        }

    private fun mapBoardForPlayer(board: Board, isCaptain: Boolean = true): BoardResponse =
        BoardResponse(
            id = board.id,
            fields = board.fields.map {
                val shouldShowTypes = it.clicked
                FieldResponse(
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
    val cardIndex: Int
)

data class FieldResponse(
    val codename: String,
    val type: Type?,
    val clicked: Boolean
)

data class BoardResponse(
    val id: String,
    val numberOfRed: Int,
    val numberOfBlue: Int,
    val fields: List<FieldResponse>,
    val starts: Team,
    val height: Int,
    val width: Int
)

data class BoardClickResponse(
    val board: BoardResponse,
    val game: GameInstance
)
