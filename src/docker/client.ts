import Docker, { Container } from "dockerode"
import { Host } from "../models/host"
import { Network } from "../models/network"
import { terminalWidth } from "yargs"

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
        container.remove({force: true})
        console.log("deleted", container.id)
        })
    })
}

// Remove all networks
export function ClearNetworks() {
    const preDefined = ['bridge', 'host', 'none']
    docker.listNetworks().then(networks => {
        networks.forEach(netw => {
            if (!preDefined.includes(netw.Name)) {
                const network = docker.getNetwork(netw.Id)
                network.remove({force: true})
                console.log("deleted", netw.Name)
            }
        })
    })
}

// Create network
export function CreateNetwork(network: Network) {
    const netw = docker.createNetwork({
        Name: network.name,
        Driver: network.driver,
        IPAM: {
            Config: [{ 
                Subnet: network.subnet,
                Gateway: network.gateway
            }],
        }
    })
    return netw
}

// Attach network to host
export async function AttachNetwork(network: Network, host: Host) {
    await network.docker?.connect({
        Container: host.name,
        EndpointConfig: {
            IPAMConfig: {
                IPv4Address: network.ip
            }
        }
    })
}