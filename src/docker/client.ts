import Docker, { Container } from "dockerode"
import { Host } from "../models/host"

const docker = new Docker()

// Create and return docker container
export async function CreateContainer(host: Host) {
    // docker pull <image>
    docker.pull(host.image, (err: Error) => {
        if (err) console.log("Error pulling image:", err)
    })
    // docker run <param>
    try {
        const container = await docker.createContainer({ 
            Image: host.image, 
            Cmd: [host.shell, "-c", "sleep infinity"], 
            name: host.name 
        })
        return container
    } catch (err) {
        console.log("Error creating container:", err)
    }
}

// Start docker container
export function StartContainer(container: Docker.Container) {
    container.start()
}

// Remove all containers
export function ClearContainers() {
    docker.listContainers().then(containers => {
    containers.forEach(cont => {
        const container = docker.getContainer(cont.Id)
        container.stop()
        container.remove({ force: true })
        })
    })
}
