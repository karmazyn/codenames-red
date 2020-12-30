package com.github.red.codenames.adapters.api

import groovyx.net.http.RESTClient
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import spock.lang.Specification

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles(["integration"])
class HelloWorldControllerSpec extends Specification {

    @LocalServerPort
    private int port

    protected RESTClient restClient

    def setup() {
        restClient = new RESTClient("http://localhost:$port", "application/json")
        restClient.setHeaders(["Content-Type": MediaType.APPLICATION_JSON_VALUE, "Accept": MediaType.APPLICATION_JSON_VALUE])
    }

    def "should say hello"() {
        given:
        when:
        def response = restClient.get(path: "/hello", params: [name: "Gosia"])

        then:
        response.status == HttpStatus.OK.value()
        response.data.msg == "Hello Gosia!"
    }
}
