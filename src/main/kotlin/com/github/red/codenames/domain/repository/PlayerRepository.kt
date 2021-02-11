package com.github.red.codenames.domain.repository

import com.github.red.codenames.domain.model.Player
import com.github.red.codenames.domain.model.Role
import com.github.red.codenames.domain.model.Team
import org.springframework.stereotype.Repository
import java.util.concurrent.ConcurrentHashMap

@Repository
class PlayerRepository {

    private val players = ConcurrentHashMap<String, Player>()

    fun listPlayers(): List<Player> = listOf(
            Player("Gosia", Team.RED, Role.GUESSER),
             Player("Kasia", Team.RED, Role.CAPTAIN),
             Player("Kacper", Team.BLUE, Role.CAPTAIN),
             Player("Matysia", Team.BLUE, Role.GUESSER)
    )

    fun getPlayer(name: String): Player? = players[name]

    fun addPlayer(name: String): Player? {
        val player = Player(name, Team.NONE, Role.SPECTATOR)
        val wasAdded = players.putIfAbsent(name, player) == null
        return if (wasAdded) player else null
    }

    fun clearPlayers() = players.clear()
}