package com.github.red.codenames.adapters.api

import com.github.red.codenames.domain.model.Player
import com.github.red.codenames.domain.model.Role
import com.github.red.codenames.domain.ports.PlayerService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/players")
class PlayerController(private val playerService: PlayerService) {


    @GetMapping
    fun getAllPlayers(): List<Player> = playerService.listPlayers()

    @GetMapping("/{name}")
    fun getPlayer(@PathVariable("name") name: String): Player? = playerService.getPlayer(name)

    @PostMapping("/{name}")
    fun addPlayer(
            @PathVariable("name") name: String,
            @RequestParam(name = "role", required = false) role: Role
    ): Player? = playerService.getPlayer(name)

}