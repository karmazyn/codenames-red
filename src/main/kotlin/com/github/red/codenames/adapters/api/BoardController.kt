package com.github.red.codenames.adapters.api

import com.github.red.codenames.domain.model.Board
import com.github.red.codenames.domain.model.Player
import com.github.red.codenames.domain.model.Role
import com.github.red.codenames.domain.ports.BoardService
import com.github.red.codenames.domain.ports.PlayerService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/boards")
class BoardController(private val boardService: BoardService) {


    @GetMapping("/{id}")
    fun getBoard(@PathVariable id: String): Board? = boardService.getBoard(id)


    @GetMapping
    fun getAllBoards(): List<Board> = boardService.listBoards()

    @PostMapping
    fun createBoard(): Board = boardService.generateBoard()

}