package com.github.red.codenames.domain.ports

import com.github.red.codenames.domain.model.Player
import com.github.red.codenames.domain.model.Team
import com.github.red.codenames.domain.repository.PlayerRepository
import org.springframework.stereotype.Service

@Service
class PlayerService(private val playerRepository: PlayerRepository) {

    fun listPlayers(): List<Player> = playerRepository.listPlayers()

    fun getPlayer(name: String): Player? = playerRepository.getPlayer(name)

    fun addPlayer(name: String): Player? = playerRepository.addPlayer(name)

    fun updatePlayer(name: String, team: Team): Player = playerRepository.updatePlayer(name, team)

}