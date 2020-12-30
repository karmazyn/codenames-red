import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "2.4.1"
    id("io.spring.dependency-management") version "1.0.10.RELEASE"
    groovy
    application
    kotlin("jvm") version "1.4.21"
    kotlin("plugin.spring") version "1.4.21"
//    id("com.moowork.node") version "1.3.1" apply false
    id("com.github.node-gradle.node") version "3.0.0-rc5" apply false
}

group = "com.github.red"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

tasks.processResources {
    dependsOn(":webapp:buildWebapp")
    from("webapp/build")

}

repositories {
    mavenCentral()
}

application {
    mainClass.set("com.github.red.codenames.CodenamesApplicationKt")
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.springframework.session:spring-session-core")

//    implementation(project(":webapp"))

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.codehaus.groovy:groovy:2.5.14")
    testImplementation(platform("org.spockframework:spock-bom:1.3-groovy-2.5"))
    testImplementation("org.spockframework:spock-core")
    testImplementation("org.spockframework:spock-spring")
    testImplementation("com.jayway.jsonpath:json-path")
    testImplementation("org.codehaus.groovy.modules.http-builder:http-builder:0.7.1")

    testRuntimeOnly("net.bytebuddy:byte-buddy:1.10.10")
    testRuntimeOnly("org.objenesis:objenesis:3.1")

}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "11"
    }
}

//tasks.clean {
//    doFirst {
//        delete.add("${rootDir}/src/resources/static/dist/")
//    }
//}