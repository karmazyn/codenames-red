package com.github.red.codenames.adapters.api

import com.github.red.codenames.domain.model.GameInstance
import com.github.red.codenames.domain.ports.GameService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/game")
class GameController(private val gameService: GameService) {
    @GetMapping("/{id}")
    fun getGame(@PathVariable id: String): ResponseEntity<GameInstance> =
        gameService.getGame(id)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity(HttpStatus.NOT_FOUND)

    @PostMapping
    fun createGame(@CookieValue("name") playerName: String): GameInstance =
        gameService.createGame(playerName)

    @PostMapping("/{id}/start")
    fun startGame(@PathVariable id: String): ResponseEntity<GameInstance> =
        gameService.startGame(id)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity(HttpStatus.NOT_FOUND)

    @PostMapping("/{id}/restart")
    fun restartGame(@PathVariable id: String): ResponseEntity<GameInstance> =
        gameService.restartGame(id)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity(HttpStatus.NOT_FOUND)

    @PostMapping("/{id}/backToLobby")
    fun backToLobby(@PathVariable id: String): ResponseEntity<GameInstance> =
        gameService.backToLobby(id)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity(HttpStatus.NOT_FOUND)

    @PostMapping("/{id}/endTurn")
    fun endTurn(@PathVariable id: String): ResponseEntity<GameInstance> =
        gameService.endTurn(id)?.let {
            ResponseEntity.ok(it)
        } ?: ResponseEntity(HttpStatus.NOT_FOUND)
}
