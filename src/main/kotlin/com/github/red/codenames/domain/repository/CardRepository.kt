package com.github.red.codenames.domain.repository

import com.github.red.codenames.domain.model.Card
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Repository
import javax.annotation.PostConstruct

@Repository
class CardRepository {

    lateinit var cards: List<Card>

    fun getCards(limit: Int): List<Card> = cards.shuffled().subList(0, limit)

    @PostConstruct
    fun loadCards(): Unit {
        val lines = ClassPathResource("codenames.csv").file.readLines()
        cards = lines
                .map { line -> line.split(";") }
                .filter { it.size == 2 }
                .map { Card(it[0].toUpperCase(), it[1].toUpperCase()) }
    }
}