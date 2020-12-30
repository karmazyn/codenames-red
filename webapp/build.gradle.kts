plugins {
    java
    id("com.github.node-gradle.node")
}

node {
    version.set("12.18.3")
    npmVersion.set("6.14.4")
    download.set(true)
}
val buildTask = tasks.register<com.github.gradle.node.npm.task.NpxTask>("buildWebapp") {
    command.set("webpack")
    dependsOn(tasks.npmInstall)
}

tasks.clean {
    doFirst {
        delete.add("node_modules")
    }
}

tasks.assemble {
    dependsOn(buildTask)
}