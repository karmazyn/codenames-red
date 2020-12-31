package com.github.red.codenames.domain.repository

import com.github.red.codenames.domain.model.Player
import com.github.red.codenames.domain.model.Role
import com.github.red.codenames.domain.model.Team
import org.springframework.stereotype.Repository
import kotlin.random.Random

@Repository
class PlayerRepository {

    private val players = mutableMapOf(
            "Gosia" to Player("Gosia", Team.RED, Role.GUESSER),
            "Kasia" to Player("Kasia", Team.RED, Role.CAPTAIN),
            "Kacper" to Player("Kacper", Team.BLUE, Role.CAPTAIN),
            "Matysia" to Player("Matysia", Team.BLUE, Role.GUESSER)
    )

    fun listPlayers(): List<Player> = players.values.toList()

    fun getPlayer(name: String): Player? = players[name]

    fun addPlayer(name: String, team: Team?): Player? {
        val player = Player(name, team ?: if (Random.nextBoolean()) Team.RED else Team.BLUE, Role.GUESSER)
        return players.putIfAbsent(name, player)
    }
}