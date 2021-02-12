package com.github.red.codenames.domain.repository

import com.github.red.codenames.domain.model.Player
import com.github.red.codenames.domain.model.Role
import com.github.red.codenames.domain.model.Team
import org.springframework.stereotype.Repository
import java.util.concurrent.ConcurrentHashMap

@Repository
class PlayerRepository {

    private val players = ConcurrentHashMap<String, Player>()

    fun listPlayers(): List<Player> = players.values.toList()

    fun getPlayer(name: String): Player? = players[name]

    fun addPlayer(name: String): Player? {
        val player = Player(name, Team.NONE, Role.GUESSER)
        val wasAdded = players.putIfAbsent(name, player) == null
        return if (wasAdded) player else null
    }

    fun updatePlayer(name: String, team: Team): Player {
        val player: Player = players[name] ?: throw UnknownPlayerException()
        val updatedPlayer = Player(name, team, player.role)

        players[name] = updatedPlayer

        return updatedPlayer
    }

    fun clearPlayers() = players.clear()
}

class UnknownPlayerException : RuntimeException() {

}
