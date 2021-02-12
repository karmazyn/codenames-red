package com.github.red.codenames.domain.model

data class Player(val name: String, val team: Team?, val role: Role)

enum class Team {
    RED, BLUE, NONE
}

enum class Role {
    CAPTAIN, GUESSER;

    fun isRole(role: String?) = toString().equals(role, ignoreCase = true)
}