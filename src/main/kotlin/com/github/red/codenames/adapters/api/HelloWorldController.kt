package com.github.red.codenames.adapters.api

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import java.util.concurrent.CompletableFuture

@RestController
@RequestMapping("/hello")
class HelloWorldController {
    @GetMapping(produces = [MediaType.APPLICATION_JSON_VALUE])
    @ResponseBody
    fun sayHello(@RequestParam(name = "name", required = false, defaultValue = "you") name: String): CompletableFuture<HelloResponse> =
            CompletableFuture.completedFuture(HelloResponse("Hello $name!"))
}

data class HelloResponse(val msg: String)