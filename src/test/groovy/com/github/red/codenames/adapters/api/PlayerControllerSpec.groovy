package com.github.red.codenames.adapters.api

import com.github.red.codenames.domain.repository.PlayerRepository
import groovyx.net.http.HttpResponseException
import groovyx.net.http.RESTClient
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import spock.lang.Specification

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles(["integration"])
class PlayerControllerSpec extends Specification {

    @LocalServerPort
    private int port

    @Autowired
    private PlayerRepository playerRepository

    private RESTClient restClient

    void setup() {
        restClient = new RESTClient("http://localhost:$port", "application/json")
        restClient.setHeaders(["Content-Type": MediaType.APPLICATION_JSON_VALUE, "Accept": MediaType.APPLICATION_JSON_VALUE])

        playerRepository.clearPlayers()
    }

    def "should add player if none exists yet"() {
        given:
        def playerName = "John"

        when:
        def response = restClient.post(path: "/api/players/$playerName")

        then:
        response.status == 201
        response.data.name == playerName
        response.data.team == "NONE"
        response.data.role == "SPECTATOR"
    }

    def "should not add player if one already exists"() {
        given:
        def playerName = "John"
        playerRepository.addPlayer(playerName)

        when:
        restClient.post(path: "/api/players/$playerName")

        then:
        def e = thrown(HttpResponseException)
        e.response.status == 409
    }

    def "should be able to return player after one was added"() {
        given:
        def playerName = "John"
        restClient.post(path: "/api/players/$playerName")

        when:
        def response = restClient.get(path: "/api/players/$playerName")

        then:
        response.status == 200
        response.data.name == playerName
        response.data.team == "NONE"
        response.data.role == "SPECTATOR"
    }

    def "should be able to return all player after one was added"() {
        given:
        def playerName = "John"
        restClient.post(path: "/api/players/$playerName")

        when:
        def response = restClient.get(path: "/api/players")

        then:
        response.status == 200
        response.data.size() == 1
        def player = response.data[0]
        player.name == playerName
        player.team == "NONE"
        player.role == "SPECTATOR"
    }
}
