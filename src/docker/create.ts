import Docker from "dockerode"
import { Host } from "../models/host"

const docker = new Docker()

export async function CreateContainer(host: Host) {
    // docker pull <image>
    console.log("pulling image..")
    docker.pull(host.image, (err: any, stream: NodeJS.ReadableStream) => {
        if (err) console.log("Error pulling image:", err)
    })
    // docker run <param>
    console.log("creating host")
    docker.createContainer({ Image: host.image, Cmd: [host.shell, "-c", "sleep infinity"], name: host.name }, async (err, container) => {
        if (err) console.log("Error creating container:", err)
        else if (container) {
            console.log("starting host..")
            await container.start()
            console.log(`Host ${host.name} started`)
        }
    })
}
