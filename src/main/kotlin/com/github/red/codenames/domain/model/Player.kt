package com.github.red.codenames.domain.model

data class Player(val name: String, val team: Team?, val role: Role)

enum class Team {
        RED, BLUE
}

enum class Role {
    CAPTAIN, GUESSER
}