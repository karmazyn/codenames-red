package com.github.red.codenames.adapters.api

import com.github.red.codenames.domain.model.Player
import com.github.red.codenames.domain.model.Team
import com.github.red.codenames.domain.ports.PlayerService
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/players")
class PlayerController(private val playerService: PlayerService) {

    @GetMapping(produces = ["application/json"])
    fun getAllPlayers(): List<Player> = playerService.listPlayers()

    @GetMapping("/{name}")
    fun getPlayer(@PathVariable("name") name: String): Player? = playerService.getPlayer(name)

    @PutMapping("/{name}", consumes = [APPLICATION_JSON_VALUE], produces = [APPLICATION_JSON_VALUE])
    fun updatePlayer(@PathVariable("name") name: String, @RequestBody request: PlayerUpdateRequest): Player? =
        playerService.updatePlayer(name, request.team)

    @PostMapping("/{name}")
    fun addPlayer(@PathVariable("name") name: String): ResponseEntity<List<Player>> =
        playerService.addPlayer(name)
            ?.let {
                val headers = HttpHeaders()
                headers.add("Set-Cookie", "name=${it.name}; Max-Age=3600; Path=/")
                headers.add("Set-Cookie", "role=${it.role}; Max-Age=3600; Path=/")

                ResponseEntity(playerService.listPlayers(), headers, HttpStatus.CREATED)
            } ?: ResponseEntity(HttpStatus.CONFLICT)
}

data class PlayerUpdateRequest(val team: Team)