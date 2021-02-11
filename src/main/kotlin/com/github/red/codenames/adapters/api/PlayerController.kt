package com.github.red.codenames.adapters.api

import com.github.red.codenames.domain.model.Player
import com.github.red.codenames.domain.ports.PlayerService
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/players")
class PlayerController(private val playerService: PlayerService) {

    @GetMapping(produces = ["application/json"])
    fun getAllPlayers(): List<Player> = playerService.listPlayers()

    @GetMapping("/{name}")
    fun getPlayer(@PathVariable("name") name: String): Player? = playerService.getPlayer(name)

    @PostMapping("/{name}")
    fun addPlayer(@PathVariable("name") name: String): ResponseEntity<Player> =
        playerService.addPlayer(name)
            ?.let {
                val headers = HttpHeaders()
                headers.add("Set-Cookie", "name=${it.name}; Max-Age=3600; HttpOnly")

                ResponseEntity(it, headers, HttpStatus.CREATED)
            } ?: ResponseEntity(HttpStatus.CONFLICT)
}