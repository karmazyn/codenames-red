package com.github.red.codenames.adapters.api


import groovyx.net.http.RESTClient
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import spock.lang.Specification

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles(["integration"])
class BoardControllerSpec extends Specification {

    @LocalServerPort
    int port

    def restClient

    void setup() {
        restClient = new RESTClient("http://localhost:$port", "application/json")
        restClient.setHeaders(["Content-Type": MediaType.APPLICATION_JSON_VALUE, "Accept": MediaType.APPLICATION_JSON_VALUE])
    }

//    def "should generate board"() {
//        given:
//        when:
//        def response = restClient.post(path: "/api/boards")
//
//        then:
//        response.status == 200
//        response.data.fields.size() == 25
//    }
}
